var express = require('express');
const UserModel = require('../models/UserModel');
const { MongoClient } = require("mongodb");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/adduser', (req, res)=>{
  res.render('user/addUser');
})

router.post('/adduser', async (req, res)=>{
  var user = req.body;

  let server = await MongoClient.connect("mongodb+srv://truongndkgch190486:sH5XgM4uekyEf6xw@cloud.pmznpli.mongodb.net/WebRequirement")
    let dbo = server.db("WebRequirement");
    dbo.collection("user").insertOne(user);
    res.redirect('/user/allUser');
})

router.get('/edituser', (req, res)=>{
  res.render('/user/editUser');
})

router.get('/edituser/:id', async (req, res)=>{
  await UserModel.findByIdAndUpdate(req.params.id, req.body)
    .then(console.log("Edit successfully !"))
    .catch((err) => console.log(err));
  res.redirect("/user/allUser");
})

router.get('/deleteuser/:id', async (req, res)=>{
  let remove = await UserModel.findByIdAndDelete(req.params.id)
  res.redirect("/user/allUser");
})

module.exports = router;
