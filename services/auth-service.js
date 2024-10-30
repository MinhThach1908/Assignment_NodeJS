const authRepository = require('../repositories/auth-repository');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secretKey = 'secret-key';

exports.findByEmail = async (email, password, req, res) => {


    if (!email || !password) return null;
    const result = await authRepository.findByEmail(email);
    if (!result) {
        return 404;
    }
    const isPasswordValid = await bcrypt.compare(password, result.password);
    if (!isPasswordValid) {
        return 401;
    }
    const token = jwt.sign({ email: result.email, _id: result._id, roles: result.roles }, secretKey, { expiresIn: '1h' });
    return { result, token};
}

exports.createNewUser = async (user, res, email) => {
    const saltRounds = 10;
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).send('Email registered successfully!')
    }
    const newUser = await authRepository.createNewUser(user);
    newUser.password = await bcrypt.hashSync(user.password, saltRounds);
    return await authRepository.createNewUser(newUser);
}