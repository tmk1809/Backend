var express = require("express");
const { MongoClient } = require("mongodb");
const UserModel = require("../models/UserModel");
var router = express.Router();

router.get('/login', async (req, res)=>{
    res.render("login");
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(422).send('Email or Password is not correct');
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) return res.status(422).send('Email or Password is not correct');
    return res.send(`User ${user.name} has logged in`);
  })

module.exports = router;