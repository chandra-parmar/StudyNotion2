import { apiConnector } from "../services/apiConnector"
import { categoryEndpoints } from "../services/apiEndpoints"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Footer from '../components/common/Footer'

import { fetchCategoryPageDetails } from "../services/operations/categoryDetails"
import Course_Card from "../components/core/CategoryCourses/Course_Card"

const Category = ()=>{

    const { categoryName } = useParams()
    const [ categoryPageData, setCategoryPageData]= useState(null)
    const [categoryId, setCategoryId] = useState("")


    //fetch all category when category changes
    useEffect(()=>{
        const getCategory = async()=>{
            const res= await apiConnector("GET", categoryEndpoints.COURSE_CATEGORIES_API)
            console.log("category from frontend 1 effect",res)
            
            const category = res?.data?.allCategory?.find(
                (ct)=> ct.name.toLowerCase() === categoryName.toLowerCase()

            )
            console.log("matched category", category)

            
            const category_id = category?._id 

            console.log("getting category id",category_id)

            setCategoryId(category_id)

        }

        getCategory()

    },[categoryName])

     useEffect(()=>{
        const getCategoryDetails = async()=>{
            try{
                const res = await fetchCategoryPageDetails(categoryId)
                console.log("printing categorydetails ",res)
                setCategoryPageData(res)

            }catch(error)
            {
                console.log(error)
            }
        }

        if(categoryId)
        {
           getCategoryDetails()
        }
        

     },[categoryId])

    return(
       <div className="min-h-screen bg-richblack-900 text-white">
            <div className="mx-auto w-11/12 max-w-maxContent py-10">

                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-richblack-300">
                <span>Home</span>
                <span className="mx-2">/</span>
                <span>Category</span>
                <span className="mx-2">/</span>
                <span className="text-yellow-50">
                    {categoryPageData?.data?.selectedCategory?.name}
                </span>
                </div>

                {/* Category Heading */}
                <div className="mb-12">
                <h1 className="text-3xl font-bold capitalize text-white md:text-4xl">
                    {categoryPageData?.data?.selectedCategory?.name}
                </h1>

                <p className="mt-3 max-w-2xl text-base text-richblack-300">
                    {categoryPageData?.data?.selectedCategory?.description}
                </p>
                </div>

                {/* Courses */}
                <div>
                <h2 className="mb-6 text-2xl font-semibold text-white">
                    Available Courses
                </h2>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryPageData?.data?.selectedCategory?.courses?.map(
                    (course, index) => (
                        <Course_Card
                        course={course}
                        key={index}
                        />
                    )
                    )}
                </div>
                </div>

            </div>

        <Footer />
      </div>
    )
}

export default Category