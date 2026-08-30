const express = require('express')

const router = express.Router()
const {createCourse,showAllCourses, getCourseDetails, editCourse} = require('../controllers/courseController')
const {auth,isInstructor} = require('../middlewares/auth')


//create course route
router.post('/',auth,isInstructor,createCourse)

//get all course route
router.get('/',auth,showAllCourses)

//get course details by id 
router.get('/:courseId',getCourseDetails)

//edit course
router.put('/',auth, isInstructor,editCourse)


module.exports= router