import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Table, Tbody, Thead, Tr, Th, Td } from 'react-super-responsive-table'
import ConfirmationModal from "../../../common/ConfirmationModal";

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useState } from "react";
import { COURSE_STATUS } from "../../../../utils/constants";
import { deleteCourse } from "../../../../services/operations/courseDetailsAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import {useNavigate} from 'react-router-dom'

const CourseList = ({setCourses, courses })=>{

    const dispatch = useDispatch()
    const {token} = useSelector((state)=> state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()

    const handleCourseDelete = async (courseId)=>{
       setLoading(true)
      
       await deleteCourse(courseId,token)
       const result = await fetchInstructorCourses(token)
       console.log("printing instructor courses",courses)
       if(result)
       {
        setCourses(result)
       }
       setConfirmationModal(null)
       setLoading(false)

    }
    return(
        <div className="text-white">
         <Table>
            <Thead>
                <Tr className="flex gap-x-10 border-richblack-800 p-8">
                    <Th>
                        Courses
                    </Th>
                    <Th>
                        Duration
                    </Th>
                    <Th>
                        Price
                    </Th>
                    <Th>
                        Actions
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    courses.length ===0 ? (
                        <Tr>
                         <Td>
                             No courses found
                         </Td>
                        </Tr>
                    ) : (
                        courses?.map( (course)=>(

                            <Tr key={course._id} className='flex gap-x-10 border-richblack-800'>

                              <Td className='flex gap-x-4'>

                                <img src={ course?.thumbnail}
                                    className="h-[150px] w-[220px] rounded-lg object-cover"
                                >
                                </img>
                                <div className="flex flex-col">
                                       <p>{course.courseName}</p>
                                       <p>{course.courseDescription}</p>
                                       <p>Created:</p>
                                       {
                                         course.status === COURSE_STATUS.DRAFT ? (
                                            <p className="text-pink-50">DRAFTED</p>
                                         ) :(
                                            <p className="text-yellow">PUBLISHED</p>
                                         )
                                       }
                                </div>
                              </Td>

                              <Td>
                                 2 hr 30min
                              </Td>
                              <Td>
                                ₹{course.price}
                              </Td>

                              <Td>
                                <button
                                className="mr-[19px]"
                                 disabled={loading} 
                                 onClick={()=>{
                                    navigate(`/dashboard/edit-course/${course._id}`)
                                 }}
                                 >
                                    Edit
                                </button>

                                <button
                                 disabled={loading}
                                  onClick={()=>{
                                    setConfirmationModal({
                                        text1:"Do you want to delete this course?",
                                        text2:"All the data related to this course will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: !loading ? ()=> handleCourseDelete(course._id) : ()=> {},
                                        btn2Handler : !loading ? ()=> setConfirmationModal(null) : ()=>{}
                                    })
                                  }}>
                                  <MdDelete />
                                 Delete
                                </button>
                              </Td>

                            </Tr>
                        ))
                    )
                }
            </Tbody>
         </Table>
        
        { confirmationModal && <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}

        </div>
    )
}

export default CourseList