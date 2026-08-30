import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints, sectionEndpoints , subSectionEndpoints } from "../apiEndpoints"

const { COURSE_CATEGORIES_API, CREATE_COURSE_API ,EDIT_COURSE_API} = courseEndpoints
const { CREATE_SECTION_API, UPDATE_SECTION_API , DELETE_SECTION_API } = sectionEndpoints
const { CREATE_SUB_SECTION_API , UPDATE_SUB_SECTION_API, DELETE_SUB_SECTION_API }= subSectionEndpoints


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
    const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
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





// create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a section
export const updateSection = async (sectionId, data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    console.log("update section api hit ")
    console.log("this is token",token)
    console.log("this is section id ",sectionId)


    try {
        const response = await apiConnector(
            "PUT",
            `${UPDATE_SECTION_API}${sectionId}`,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        )

        console.log("update section api response ", response)

        if (!response?.data?.success) {
            throw new Error("could not update section")
        }

        toast.success("course section updated")
        result = response?.data?.data
    }
    catch(error) {
        console.log("Update section api error", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result
}



// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
   
    const response = await apiConnector(
            "DELETE",
            `${DELETE_SECTION_API}${data.courseId}/${data.sectionId}`,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// create sub section
export const createSubSection = async (data, token )=>{

  let result = null
  const toastId = toast.loading("loading...")

  try{
      const response =  await apiConnector("POST", CREATE_SUB_SECTION_API, data ,{
        Authorization : `Bearer ${token}`
       })

       console.log("createsubsection api ", response)

       if(!response?.data?.success)
       {
         throw new Error("Could not add lecture")
       }

       toast.success("lecture added")

       result = response?.data?.data


  }
  catch(error)
  {
    console.log("STATUS:", error.response?.status)
    console.log("BACKEND RESPONSE:", error.response?.data)
    console.log("create subsection api error:", error)
    toast.error(error.message)


  }

  toast.dismiss(toastId)
  return result 

}


//update subSection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", UPDATE_SUB_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", `${DELETE_SUB_SECTION_API}${data.sectionId}/${data.subSectionId}`, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}