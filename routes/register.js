var express = require("express");
const { MongoClient } = require("mongodb");
const UserModel = require("../models/UserModel");
const data = require("../data");
var router = express.Router();

router.get('/register', (req, res)=>{
    res.render("register");
})

router.post('/register', async (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;
    UserModel.create({
        email: email,
        password: password
    })
    .then(data=>{
        console.log("Register successfully");
    })
    .catch(err=>{
        console.log("Register failed");
    })
    console.log("Successful sign up");
    res.render("login");
})

module.exports = router;