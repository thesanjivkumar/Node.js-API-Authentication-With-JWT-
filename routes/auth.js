const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    //Checking if user is already exit
    const emailExit = await User.findOne({email: req.body.email});
    if(emailExit) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password : hashedPassword
    });
    try{
        const saveUser = await user.save();
        res.send({user: user});
    }catch(err) {
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async(req, res) => {
     //Checking if the email exists
     const user = await User.findOne({email: req.body.email});
     if(!user) return res.status(400).send('Email is not found');
     //Password is correct
     const validPass = await bcrypt.compare(req.body.password, user.password);
     if(!validPass) return res.status(400).send('Invalid password');
     //Create and assign a token
     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
     res.header('auth-token', token).send(token);   
 
})


module.exports = router;
