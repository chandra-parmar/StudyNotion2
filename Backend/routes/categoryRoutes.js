const express = require('express')
const router = express.Router()

const {auth ,isAdmin} = require('../middlewares/auth')
const {createCategory, showAllCategory, categoryPageDetails}= require('../controllers/categoryController')


//create category
router.post('/',auth,isAdmin,createCategory)

//get all category

router.get('/',showAllCategory)

//get categories page details
router.get('/:categoryId',categoryPageDetails)





module.exports = router