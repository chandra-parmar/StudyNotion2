import { useEffect } from "react"
import  GetAvgRating  from '../../../utils/avgRating'
import { Link } from "react-router-dom"
import { useState } from "react"
import RatingStars from '../../common/RatingStars'


const Course_Card = ({ course })=>{

    const [avgReviewCount , setAvgReviewCount ]= useState(0)

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count)

    },[course])
    
    return(
        <div className="h-full">
            <Link to={`/courses/${course._id}`}>
                <div className="h-full overflow-hidden rounded-xl bg-richblack-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

                {/* Thumbnail */}
                <div className="w-full overflow-hidden">
                    <img
                    src={course?.thumbnail}
                    alt="course thumbnail"
                    className="h-52 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Course Information */}
                <div className="p-5">

                    {/* Course Name */}
                    <p className="line-clamp-2 text-lg font-semibold text-white">
                    {course?.courseName}
                    </p>

                    {/* Instructor */}
                    <p className="mt-2 text-sm text-richblack-300">
                    {course?.instructor?.firstName}{" "}
                    {course?.instructor?.lastName}
                    </p>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-2">

                    <span className="font-semibold text-yellow-50">
                        {avgReviewCount || 0}
                    </span>

                    <span>
                        <RatingStars Review_Count={avgReviewCount} />
                    </span>

                    <span className="text-sm text-richblack-400">
                        ({course?.ratingAndReviews?.length || 0} Ratings)
                    </span>

                    </div>

                    {/* Price */}
                    <p className="mt-4 text-xl font-bold text-white">
                    ₹ {course?.price}
                    </p>

                </div>
                </div>
            </Link>
        </div>
    )
}

export default Course_Card 