const express = require('express')
const { createSection, updateSection, deleteSection } = require('../controllers/sectionController')
const {auth,isInstructor} = require('../middlewares/auth')
const router = express.Router()


//create section routes
router.post('/',auth, isInstructor,createSection)

//update 
router.put('/:sectionId',auth, isInstructor,updateSection)

//delete section
router.delete('/:courseId/:sectionId',auth, isInstructor,deleteSection)


module.exports = router