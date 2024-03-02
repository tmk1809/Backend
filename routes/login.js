var express = require("express");
const { MongoClient } = require("mongodb");
const UserModel = require("../models/UserModel");
const data = require("../data");
var router = express.Router();

router.get('/login', (req, res)=>{
    res.render("login");
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(422).send('Email or Password is not correct');
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) return res.status(422).send('Email or Password is not correct');
    
    res.redirect('/');
  })

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