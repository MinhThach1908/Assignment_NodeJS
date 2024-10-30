const User = require('../models/user');
const Role = require('../models/role');

exports.findByEmail = async (email) => {
    return await User.findOne({email: email});
};

exports.createNewUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
}
