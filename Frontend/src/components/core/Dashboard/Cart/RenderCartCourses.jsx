import { useDispatch, useSelector } from "react-redux"
import { GiNinjaStar } from 'react-icons/gi'
import { MdDelete } from "react-icons/md"
import { removeFromCart } from "../../../../reducer/slices/cartSlice"
import ReactStars from 'react-stars'

const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    return (

        <div className="flex flex-col gap-4">

            {
                cart.map((course) => (

                    <div
                        key={course._id}
                        className="flex flex-col gap-5 rounded-md border border-richblack-700 bg-richblack-800 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >

                        {/* ================= COURSE INFO ================= */}

                        <div className="flex min-w-0 gap-4">

                            {/* Thumbnail */}

                            <img
                                src={course?.thumbnail}
                                alt={course?.courseName}
                                className="h-[90px] w-[140px] shrink-0 rounded-md object-cover"
                            />


                            {/* Details */}

                            <div className="min-w-0">

                                <p className="truncate text-lg font-semibold text-richblack-5">

                                    {course?.courseName}

                                </p>


                                <p className="mt-1 text-sm text-richblack-300">

                                    {course?.category?.name}

                                </p>


                                {/* Rating */}

                                <div className="mt-3 flex flex-wrap items-center gap-2">

                                    <span className="text-sm font-semibold text-yellow-50">

                                        4.8

                                    </span>


                                    <ReactStars
                                        count={5}
                                        value={4.8}
                                        size={18}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={
                                            <GiNinjaStar />
                                        }
                                        fullIcon={
                                            <GiNinjaStar />
                                        }
                                    />


                                    <span className="text-xs text-richblack-400">

                                        ({course?.ratingAndReviews?.length || 0} Ratings)

                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* ================= PRICE + REMOVE ================= */}

                        <div className="flex shrink-0 items-center justify-between gap-6 sm:flex-col sm:items-end">

                            {/* Remove */}

                            <button
                                onClick={() =>
                                    dispatch(
                                        removeFromCart(course._id)
                                    )
                                }
                                className="flex items-center gap-2 text-sm text-pink-200 transition-all duration-200 hover:text-pink-100"
                            >

                                <MdDelete size={20} />

                                <span>
                                    Remove
                                </span>

                            </button>


                            {/* Price */}

                            <p className="text-lg font-semibold text-yellow-50">

                                ₹{course?.price}

                            </p>

                        </div>

                    </div>

                ))
            }

        </div>
    )
}

export default RenderCartCourses