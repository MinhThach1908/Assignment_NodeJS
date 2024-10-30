const jwt = require('jsonwebtoken');
const secretKey = 'secret-key';
const User = require('../models/user');
const Permission = require('../models/permission');

const authenticateToken =  (req, res, next) => {
    console.log("vao ")
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Token not found!' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token not valid!' });
        }
        req.user = user; // Gán thông tin người dùng vào request
        console.log("Authenticated user:", req.user); // Ghi log thông tin người dùng
        next();
    });
};

const checkPermission = async (req, res, next) => {
        try {
            console.log("------")
            console.log("Checking permissions for user:", req.user); // Ghi log thông tin người dùng

            const userId = req.user._id;
            const user = await User.find({_id: userId}, {password: 0}).populate({
                path: 'roles',
                populate: {
                    path: 'permissions'
                }
            });

            const userPermissions = user[0].roles.reduce((acc, role) => {
                role.permissions.forEach(permission => {
                    acc.push({ url: permission.url, method: permission.method });
                });
                return acc;
            }, []);

            const hasPermission = userPermissions.some(
                (p) => req.url.includes(p.url)
                && p.method === req.method
            );

            if (hasPermission) {
                next();
            } else {
                return res.status(403).json({ message: 'You do not have permission to access this page!' });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error', error })
        }
};

const runCheckPermission = async (req, res, next) => {
    return await checkPermission(req, res, next);
};

module.exports = { authenticateToken, runCheckPermission }