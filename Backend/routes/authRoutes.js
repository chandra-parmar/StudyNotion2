const express = require('express')
const { sendOtp ,signUp,login } = require('../controllers/Auth')
const router = express.Router()



router.post('/sendotp',sendOtp)

router.post('/signup',signUp)

router.post('/login',login)



module.exports = router