const mongoose = require('mongoose');
const Permission = require('../models/permission');
const Role = require('../models/role');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect('mongodb://127.0.0.1:27017/demo-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
});

exports.process = async () => {
    const permissionAdminGet = new Permission({
        name: 'Admin Access', url: '/api/admin', method: 'GET'
    });
    const permissionEditorGet = new Permission({
        name: 'Editor Access', url: '/api/editor', method: 'GET'
    });
    const permissionUserGet = new Permission({
        name: 'User Access', url: '/api/user', method: 'GET'
    })
    const permissionCreateUserPost = new Permission({
        name: 'Create User', url: '/api/user/create', method: 'POST'
    });
    const permissionCreateEditorPost = new Permission({
        name: 'Create Editor', url: '/api/editor/create', method: 'POST'
    });
    const permissionManagerGet = new Permission({
        name: 'Manager Access', url: '/api/manager', method: 'GET'
    });
    const permissionEManagerGet = new Permission({
        name: 'Employee Manager Access', url: '/api/employee-manager', method: 'GET'
    });
    const permissionViewUserGet = new Permission({
        name: 'View All User', url: '/api/user/view', method: 'GET'
    });
    await permissionManagerGet.save();
    await permissionEManagerGet.save();
    await permissionViewUserGet.save();
    await permissionCreateEditorPost.save();
    await permissionEditorGet.save();
    await permissionUserGet.save();
    await permissionAdminGet.save();
    await permissionCreateUserPost.save();

    const roleAdmin = new Role({
        name: 'Admin', permissions: [permissionAdminGet._id, permissionCreateUserPost._id, permissionCreateEditorPost._id]
    });
    const roleUser = new Role({
        name: 'User', permissions: [permissionUserGet._id]
    });
    const roleEditor = new Role({
        name: 'Editor', permissions: [permissionEditorGet._id, permissionCreateUserPost._id]
    });
    const roleManager = new Role({
        name: 'Manager', permissions: [permissionManagerGet._id, permissionViewUserGet._id]
    });
    const roleEManager = new Role({
        name: 'Employee Manager', permissions: [permissionEManagerGet._id, permissionViewUserGet._id]
    });
    await roleManager.save();
    await roleEditor.save();
    await roleEManager.save();
    await roleAdmin.save();
    await roleUser.save();

    const userAdmin = new User({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('admin password', saltRounds),
        roles: [roleAdmin._id]
    });
    const userDefault = new User({
        name: 'Normal User',
        email: 'user@gmail.com',
        password: await bcrypt.hash('my password', saltRounds),
        roles: [roleUser._id]
    });
    const userEditor = new User({
        name: 'Editor',
        email: 'editor@gmail.com',
        password: await bcrypt.hash('editor password', saltRounds),
        roles: [roleEditor._id]
    })
    const userManager = new User({
        name: 'Manager',
        email: 'manager@gmail.com',
        password: await bcrypt.hash('manager password', saltRounds),
        roles: [roleManager._id]
    })
    const userEManager = new User({
        name: 'Employee Manager',
        email:'employeemanager@gmail.com',
        password: await bcrypt.hash('emanager password', saltRounds),
        roles: [roleEManager._id]
    })
    await userAdmin.save();
    await userDefault.save();
    await userEditor.save();
    await userManager.save();
    await userEManager.save();

    console.log('Seeding successfully!');
};

