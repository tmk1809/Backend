var express = require("express");
const { MongoClient } = require("mongodb");
const UserModel = require("../models/UserModel");
const data = require("../data");
var router = express.Router();

router.get('/login', (req, res)=>{
    res.render("login");
})

// router.post('/login', async (req, res) => {
//     const user = await User.findOne({email: req.body.email});
//     if (!user) return res.status(422).send('Email or Password is not correct');
//     const checkPassword = await bcrypt.compare(req.body.password, user.password);
//     if (!checkPassword) return res.status(422).send('Email or Password is not correct');
    
//     res.redirect('/');
//   })



router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).send('Incorrect password');
    }

    // Set up a session or generate a token for authentication
    // For session-based authentication:
    req.session.userId = user._id;

    // For token-based authentication:
    // You can generate and send a token back to the client

    // Redirect or send response as per your application's logic
    res.redirect('/'); // Redirect to the dashboard page after successful login
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;