const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: String,
    url: String,
    method: String,
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;