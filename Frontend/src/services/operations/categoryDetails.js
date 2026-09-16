import toast from "react-hot-toast"
import { categoryEndpoints } from "../apiEndpoints"
import { apiConnector } from "../apiConnector"



// show all category 
// fetching the available course categories
export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", categoryEndpoints.COURSE_CATEGORIES_API)
    console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// fetch category details by id 
export const fetchCategoryPageDetails = async(categoryId)=>{

    const toastId = toast.loading("loading...")
    let result = []

    try{
       
      const response = await apiConnector("POST",categoryEndpoints.CATEGORY_PAGE_DATA_API,
        {categoryId: categoryId}
      )

      console.log("frontend categoryDetails", response)

      if(!response?.data?.success)
      {
        throw new Error("could not fetch category page data")
      }

       result = response?.data


    }catch(error)
    {
        console.log("category page data api error frontend",error)
        toast.error(error.message)
        result = error.response?.data     
    }
    toast.dismiss(toastId)
    return result 
}