import { useSelector } from "react-redux"
import IconBtn from '../../../common/IconBtn'

const TotalAmount = () => {

    const { total, cart } = useSelector((state) => state.cart)


    const handleBuyCourse = () => {

        const courses = cart.map((course) => course._id)

        console.log("bought these courses", courses)

        // TODO: API integrate - payment gateway
    }


    return (

        <div className="sticky top-10 rounded-md border border-richblack-700 bg-richblack-800 p-6">

            {/* Heading */}

            <p className="text-sm font-medium text-richblack-300">
                Total
            </p>


            {/* Total price */}

            <p className="mt-2 text-3xl font-semibold text-richblack-5">

                ₹{total}

            </p>


            {/* Divider */}

            <div className="my-5 h-px bg-richblack-600" />


            {/* Buy button */}

            <IconBtn
                text="Buy now"
                onClick={handleBuyCourse}
                customClasses="w-full justify-center"
            />

        </div>

    )
}

export default TotalAmount