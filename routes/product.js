const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res)=> {
    res.json({title: "login user only can access private routes "})
})

module.exports = router