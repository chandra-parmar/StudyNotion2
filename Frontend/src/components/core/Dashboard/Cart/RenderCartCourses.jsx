import { useDispatch, useSelector } from "react-redux"
import { GiNinjaStar} from 'react-icons/gi'
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../reducer/slices/cartSlice";
import ReactStars from 'react-stars'


const RenderCartCourses = ()=>{

    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()



    return(

        <div>
            {
                cart.map((course, index)=> (

                    <div>

                        <div>
                            <img src={course?.thumbnail }></img>
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                <div>
                                    <span>4.8</span>
                                    <ReactStars
                                       count={5}
                                       size={20}
                                       edit={false}
                                       activeColor="#ffd700"
                                       emptyIcon={<GiNinjaStar></GiNinjaStar>}
                                       fullyIcon={<GiNinjaStar></GiNinjaStar>}>

                                       </ReactStars>

                                       <span>{course?.ratingAndReviews?.length }Ratings</span>

                                </div>
                            </div>
                        </div>

                        <div>

                            <button onClick={ ()=> dispatch(removeFromCart(course._id ))}>

                                 <MdDelete />  
                                 <span>Remove</span>
                            </button>

                            <p>Rs. {course?.price }</p>

                        </div>
                        
                    </div>

                ))
            }
        </div>
    )
}

export default RenderCartCourses