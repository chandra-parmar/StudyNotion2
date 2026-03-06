const express = require('express')

const router = express.Router()
const {createCourse,showAllCourses} = require('../controllers/courseController')
const {auth,isInstructor} = require('../middlewares/auth')


router.post('/course',auth,isInstructor,createCourse)

router.get('/course',auth,showAllCourses)


module.exports= router