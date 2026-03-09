const express = require('express')
const router = express.Router()

const {updateProfile, deleteAccount, getUserDetails} = require("../controllers/profileController")
const {auth} = require('../middlewares/auth')


router.put('/:userId',auth,updateProfile)

router.delete('/:id',auth,deleteAccount)

router.get('/:id',getUserDetails)


module.exports = router