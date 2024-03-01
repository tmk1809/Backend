var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String
});

const UserModel = mongoose.model('user', UserSchema, 'user');
module.exports = UserModel;