const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role'}]
});

const User = mongoose.model('User', userSchema);


module.exports = User