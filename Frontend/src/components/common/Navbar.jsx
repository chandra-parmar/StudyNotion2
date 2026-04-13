
import React, { useEffect } from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BsCart } from "react-icons/bs";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import axios from 'axios'
import { useState } from 'react'
import { GoChevronDown } from "react-icons/go";

const Navbar = () => {

    const { token } = useSelector((state) => state.auth)
    const { user} = useSelector ((state)=> state.profile)
    const {totalItems} = useSelector((state)=> state.cart)

    const location = useLocation()

    const matchRoute = (route) =>{
        return matchPath(  route, location.pathname)
    }
    const [categoryLink , setCategoryLink] = useState([])

    // api call for get all category 
    const fetchAllCategory = async()=>{
        try{

            const res = await axios.get('http://localhost:4000/api/v1/category/',{
                withCredentials:true
            })
            console.log(res.data.allCategory)
            setCategoryLink(res.data.allCategory || [])

        }catch(err)
        {
            console.log("error while fetching category",err)
            setCategoryLink([])
        }
    } 

    useEffect(()=>{
        fetchAllCategory()
    },[])

  return (

    <div className='h-14 border-b-[1px] border-b-richblack-700'>

          <div className='flex w-11/12 max-w-maxContent flex-row justify-evenly mt-3'>

              {/* logo */}
              <div>
                <Link><img src={Logo} alt='logo' width={160} height={42} loading='lazy'></img></Link>
              </div>

              {/* nav links */}
                <nav>
                    <ul className='flex flex-row justify-center  gap-7  mt-1.5'>
                         {
                            NavbarLinks.map(( link, index)=>{

                             return  <li key={index}>
                                {
                                    link.title === 'Courses' ? (

                                        <div className='relative flex items-center gap-1 group'>

                                            <p className="text-white">{ link.title}</p>
                                            <GoChevronDown className='text-white' />

                                             
                                              <div className="
                                                        absolute left-1/2 top-full
                                                        -translate-x-1/2
                                                        mt-2
                                                        flex flex-col
                                                        rounded-md bg-richblack-5 p-4 text-richblack-900
                                                        opacity-0 invisible
                                                        transition-all duration-200
                                                        group-hover:opacity-100 group-hover:visible
                                                        lg:w-[300px]
                                                        z-50
                                                    ">

                                                 <div className="
                                                        absolute left-1/2 top-0
                                                        -translate-x-1/2 -translate-y-1/2
                                                        h-4 w-4 rotate-45 bg-richblack-5
                                                        "> </div>

                                                  {
                                                        
                                                            (categoryLink || []).map((category,index) => (
                                                                
                                                                    <Link to={ `/catalog/${ category.name }`} key={category._id || index }
                                                                       className='px-2 py-1 rounded hover:bg-richblack-100' >
                                                                        <p>{ category.name}</p>
                                                                    </Link>
                                                                
                                                              ) 
                                                            )
                                                        
                                                    }
                                              </div>


                                                
                                                    
                                             </div>

                                    
                                        ) : (
                                        // home contanct us 
                                        <Link to={ link?.path } >
                                            <p className={ `${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}</p>
                                        </Link>
                                    )
                                }
                               </li>
                            })
                        }
                    </ul>
                </nav>

              {/* buttons auth and dashboard */}
              <div className='flex items-center gap-3 ml-[10px] mb-2'>


               {/* if token null no user logged in show login signup button */}
                      
                      {
                        token === null && (

                            <div className=' text-white border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] flex flex-row gap-2 rounded-md transition delay-100 ease-in-out hover: -translate-y-1 hover:scale-110 '>

                                  <Link to='/login'>
                                        <button >Log in </button>
                                  </Link>

                                   

                            </div>
                            

                        )
                      }

                       {
                         token === null && (

                            <div className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] flex flex-row gap-2 rounded-md text-white transition delay-100 ease-in-out hover: -translate-y-1 hover:scale-110'>

                                  <Link to='/signup'>
                                        <button>Sign up </button>
                                  </Link>

                                   

                            </div>
                            

                        )
                      }

                   {/* { if user logged in and it student then show cart } */}
                   {
                     user && user?.accountType !== 'Instructor'  && (

                        <Link to ='/dashboard/cart' className='relative'>
                            <BsCart />
                            {
                                totalItems > 0 && (
                                    <span>{ totalItems }</span>
                                )
                            }
                        </Link>
                     )

                   }
                    

                      {/* user logged in show drop down  */}

                      {
                         token !== null && <ProfileDropDown></ProfileDropDown>
                      }
                      

              </div>
          </div>
    </div>
  )
}

export default Navbar
