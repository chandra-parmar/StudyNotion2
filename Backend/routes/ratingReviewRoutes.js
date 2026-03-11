const express = require('express')
const { createRating, getAverageRating } = require('../controllers/RatingAndReviewController')
const {auth , isStudent} = require('../middlewares/auth')

const router = express.Router()

//create rating 
router.post('/rating',auth,isStudent,createRating)

//get rating and review
router.get('/rating',auth,isStudent,getAverageRating)

//get average rating by course id 
router.get('/getAverageRating',auth,isStudent,getAverageRating)


module.exports= router