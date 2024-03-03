var express = require("express");
const { MongoClient } = require("mongodb");
const UserModel = require("../models/UserModel");
const data = require("../data");
var router = express.Router();

router.get('/', (req, res)=>{
    res.json('index')
})

router.get('/register', (req, res)=>{
    res.render("register");
})

router.post('/register', async (req, res, next)=>{
    var email = req.body.email;
    var password = req.body.password;
    await UserModel.findOne({
        email: email
    })
    .then(data=>{
        if(data){
            res.json('User has been existed')
        }else{
            return UserModel.create({
                email: email,
                password: password
            })
        }
    })
    .then(data=>{
        res.json('Register successfully')
    })
    .catch(err=>{
        res.status(500).json('Failed register')
    })
})

module.exports = router;