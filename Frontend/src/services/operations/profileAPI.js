import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apiEndpoints";

const {
  GET_USER_ENROLLED_COURSES_API,
} = profileEndpoints;













// get user enrooled course
export async function getUserEnrolledCourses(token)
{
    const toastId = toast.loading("loading...")
    let result=[]

    try{
        console.log("Calling backend api for enrolled course")
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API,
            null,{
                Authorization: `Bearer ${token}`
            } )

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }
            result = response.data.data

        

    }catch(error)
    {
        console.log("Get user enrolled course api error",error)
        toast.error("Could not get Enrolled courses")

        
    }
    toast.dismiss(toastId)
    return result

}