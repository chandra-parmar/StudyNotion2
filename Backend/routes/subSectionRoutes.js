const express = require('express')

const {auth,isInstructor} = require('../middlewares/auth')
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/subSectionController')
const router = express.Router()


//create section routes
router.post('/',auth, isInstructor,createSubSection)

//update 
router.put('/:sectionId/:subSectionId',auth, isInstructor,updateSubSection)

//delete sub section (needs both section and subSection id)
router.delete('/:sectionId/:subSectionId',auth, isInstructor,deleteSubSection)


module.exports = router