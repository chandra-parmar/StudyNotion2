const express = require('express')
const router = express.Router()

const {auth ,isAdmin} = require('../middlewares/auth')
const {createCategory, showAllCategory}= require('../controllers/categoryController')


//create category
router.post('/',auth,isAdmin,createCategory)

//get all category

router.get('/',showAllCategory)





module.exports = router