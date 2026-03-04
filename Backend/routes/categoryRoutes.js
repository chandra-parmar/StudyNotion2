const express = require('express')
const router = express.Router()

const {auth ,isAdmin} = require('../middlewares/auth')
const {createCategory, showAllCategory}= require('../controllers/categoryController')


//category routes
router.post('/category',auth,isAdmin,createCategory)
router.get('/category',showAllCategory)




module.exports = router