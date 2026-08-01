import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apiEndpoints"

const { COURSE_CATEGORIES_API, CREATE_COURSE_API ,EDIT_COURSE_API} = courseEndpoints



//fetch course categories
export const fetchCourseCategories = async () => {
  let result = [];

  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);

    console.log("Course Category API Response:", response);

    if (!response?.data?.success) {
      throw new Error("Could not fetch course category");
    }

    result = response?.data?.allCategory || [];
  } catch (error) {
    console.log("Course Category API Error:", error);
    toast.error(error.message);
  }

  return result;
};

//add the course details
export const addCourseDetails = async(data, token)=>
{
    let result = null
    const toastId = toast.loading("loading...")
    try{
        const response = await apiConnector("POST", CREATE_COURSE_API, data,{
            "Content-Type": "multipart/form-data",
            Authorization : `Bearer ${token}`
        })

         console.log("CREATE course api response ",response)

         if ( !response?.data?.success)
         {
            throw new Error("Could not add course details")
         }

         toast.success("course details added successfully")

         result = response?.data?.data

    }
    catch(error)
    {
        console.log("Create course api error", error)
        toast.error(error.message)

    }

    toast.dismiss(toastId)

    return result 
   

}

// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorisation: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}