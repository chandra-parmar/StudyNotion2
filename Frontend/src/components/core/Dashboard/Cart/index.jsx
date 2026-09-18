import { useSelector } from "react-redux"
import RenderCartCourses from './RenderCartCourses'
import TotalAmount from "./TotalAmount"

const Cart = () => {

    const { total, totalItems } = useSelector((state) => state.cart)

    return (
        <div className="min-h-[calc(100vh-80px)] bg-richblack-900 px-4 py-10 text-white">

            <div className="mx-auto w-11/12 max-w-[1200px]">

                {/* Heading */}

                <h1 className="text-3xl font-semibold text-richblack-5">
                    Your cart
                </h1>

                <p className="mt-2 text-sm text-richblack-300">
                    {totalItems} Courses in cart
                </p>


                {
                    total > 0 ? (

                        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">

                            {/* Cart courses */}

                            <div className="w-full lg:flex-1">

                                <RenderCartCourses />

                            </div>


                            {/* Total */}

                            <div className="w-full lg:w-[320px]">

                                <TotalAmount />

                            </div>

                        </div>

                    ) : (

                        <div className="mt-10 rounded-md border border-richblack-700 bg-richblack-800 px-6 py-12 text-center">

                            <p className="text-lg text-richblack-200">
                                Your cart is empty
                            </p>

                            <p className="mt-2 text-sm text-richblack-400">
                                Add some courses to your cart to get started.
                            </p>

                        </div>

                    )
                }

            </div>

        </div>
    )
}

export default Cart