const express = require('express')
const { sendOtp ,signUp,login } = require('../controllers/Auth')
const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword')
const router = express.Router()



router.post('/sendotp',sendOtp)

router.post('/signup',signUp)

router.post('/login',login)


//reset password token route
router.post('/reset-password-token',resetPasswordToken)

router.post('/reset-password',resetPassword)



module.exports = router