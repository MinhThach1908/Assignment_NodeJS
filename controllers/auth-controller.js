const authService = require('../services/auth-service');

exports.register = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ message: 'User not found!' });
        // 671f7edb805e7d67f821364e - User
        // 671f7edb805e7d67f821364d - Admin
        // 671f7edb805e7d67f8213650 - Manager
        // 671f7edb805e7d67f821364f - Editor
        // 671f7edb805e7d67f8213651 - Employee Manager
        req.body.roles = "671f7edb805e7d67f821364e"; // Default: User
        console.log(req.body);
        const result = await authService.createNewUser(req.body);
        console.log(result)
        res.redirect('/auth/register');
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error!' });
    }
}

exports.login = async (req, res) => {
    try {
        const result = await authService.findByEmail(
            req.body.email,
            req.body.password
        );
        if (result === 404) {
            return res.status(404).json({ message: 'User not found!' });
        }
        if (result === 401) {
            return res.status(401).json({ message: 'Invalid password! '});
        }
        res.cookie('token', result.token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        if ( result.result.roles.map((role) => role.toString()).includes('671f7edb805e7d67f821364d')) {
            return res.redirect("/auth/api/admin");
        }
        if ( result.result.roles.map((role) => role.toString()).includes('671f7edb805e7d67f821364f')) {
            return res.redirect("/auth/api/editor");
        }
        if ( result.result.roles.map((role) => role.toString()).includes('671f7edb805e7d67f8213650')) {
            return res.redirect("/auth/api/manager");
        }
        if ( result.result.roles.map((role) => role.toString()).includes('671f7edb805e7d67f8213651')) {
            return res.redirect("/auth/api/emanager");
        }
        return res.redirect("/auth/api/user")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error!' });
    }
}

// const saltRounds = 10;
//
// exports.register = async  (req, res) => {
//     try {
//         const {username, email, password, roles} = req.body;
//         const existingUser = await User.findOne({email});
//         if (existingUser) {
//             return res.status(400).send('Email registered successfully!')
//         }
//         const passwordHash = await bcrypt.hash(password, saltRounds);
//         const userRoles = await Role.find({name: {$in: role}});
//         const newUser = new User({
//             username,
//             email,
//             passwordHash,
//             roles: userRoles.map(role => role._id)
//         });
//         await newUser.save();
//         res.status(201).send('Register successfully!');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error')
//     }
// }
//
// exports.login = async (req, res) => {
//     const { email, password } = req.body();
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not exist!' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: 'Invalid password!' });
//         }
//         const token = jwt.sign({ userId: user._id, roles: user.roles }, secretKey, { expiresIn: '1h' })
//         res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
//         res.json({ message: 'Login successfully!' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error!' });
//     }
// };