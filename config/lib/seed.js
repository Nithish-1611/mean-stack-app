'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

//Add Local User
User.find({username: 'user'}).remove(function () {
    var user = new User({
        username: 'user',
        password: 'test123',
        provider: 'local',
        email: 'user@localhost.com',
        firstName: 'User',
        lastName: 'Local',
        displayName: 'User Local',
        roles: ['user']
    });
    // Then save the user
    user.save(function (err) {
        if (err) {
            console.log('Failed to add local user');
        } else {
            console.log('Local user added');
        }
    });
});


//Add Local Admin
User.find({username: 'admin'}).remove(function () {
    var user = new User({
        username: 'admin',
        password: 'test123',
        provider: 'local',
        email: 'admin@localhost.com',
        firstName: 'Admin',
        lastName: 'Local',
        displayName: 'Admin Local',
        roles: ['user', 'admin']
    });
    // Then save the user
    user.save(function (err) {
        if (err) {
            console.log('Failed to add local admin');
        } else {
            console.log('Local admin added');
        }
    });
});
