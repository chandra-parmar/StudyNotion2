import { useEffect } from "react"
import ProgressBar from '@ramonak/react-progress-bar'
import { useState } from "react"
import { useSelector} from 'react-redux'
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"




const EnrolledCourses = ()=>{

     const { token } = useSelector((state) => state.auth)

     const [ enrolledCourses , setEnrolledCourses] = useState(null)

     const getEnrolledCourses = async ()=>{
        try{
              const response = await getUserEnrolledCourses(token)
             setEnrolledCourses(response)
                 
        }
        catch(error)
        {
            console.log("unable to fetch enrolled courses")

        }
     }

     useEffect( ()=>{
        getEnrolledCourses()
     },[])

    return(

        <div className="text-white">

                <div> Enrolled Courses</div>
             {
                !enrolledCourses ? (<div>Loading...</div>) : !enrolledCourses.length ? (<p> you have not enrolled in any course</p>)
                : (
                    <div>
                        <div>

                          <p>Course name</p>
                           <p>Durations</p>
                            <p>Progress</p>
                        </div>

                        {/* cards  */}
                        {
                            enrolledCourses.map((course,index) => (

                                <div>
                                     <div>
                                        <img src={ course.thumbnail} ></img>
                                     </div>

                                     <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                     </div>

                                     <div>
                                        { course?.totalDuration}
                                     </div>

                                     <div>
                                        <p>Progress: {course.progressPercentage ||0 }%</p>
                                        <ProgressBar
                                          completed={course.progressPercentage || 0}
                                          height='8px'
                                          isLabelVisible={false}
                                          >

                                        </ProgressBar>
                                     </div>

                                     {/* progress bar  */}


                                </div>
                            ))
                        }

                    </div>
                )
             }


        </div>
    )
}

export default EnrolledCourses