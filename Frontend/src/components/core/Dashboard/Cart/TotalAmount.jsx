import { useSelector } from "react-redux"
import IconBtn from '../../../common/IconBtn'


const TotalAmount = () =>{

    const {total, course ,cart} = useSelector((state)=> state.cart)

    const handleBuyCourse = () =>{
        const courses = cart.map((course) => course._id)
        console.log("bought these course",course)
        //TODO api intergate -payment gateway 
    }

    return(

        <div>
           <p>Total</p>
           <p>Rs. {total}</p>

        <IconBtn 
           text="Buy now"
           onClick={handleBuyCourse}
           customClasses={"w-full justify-center"}></IconBtn>
        </div>
    )
}

export default TotalAmount