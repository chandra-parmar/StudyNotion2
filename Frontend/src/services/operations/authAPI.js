
import { toast } from 'react-hot-toast'
import { setLoading, setToken } from '../../reducer/slices/authSlice'
import { apiConnector } from '../apiConnector'
import { authEndpoints } from '../apiEndpoints'
import { setUser } from '../../reducer/slices/profileSlice'
import { resetCart } from '../../reducer/slices/cartSlice'



const { 
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
} = authEndpoints

// send otp api
export function sendOtp(email , navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("loading..")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", SENDOTP_API ,
                {
                    email,
                    checkUserPresent : true
                }
            )
            console.log("sendotp api response",response)
            console.log(response.data.success)

            if(!response.data.success)
            {
                throw new Error(response.data.message)
            }

            toast.success(" otp sent successfully")
            
            if(navigate)
            {
                navigate('/verify-email')
            }
           

        }catch(error){
            console.log("sendotp api error...",error)
            toast.error("Could not send otp")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
}

//signup api
export function signUp (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
)
{
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SIGNUP_API,{
                accountType,
                 firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    otp
            })

            console.log("Signup api response",response)

            if(! response.data.success)
            {
                throw new Error(response.data.message)

            }
            toast.success("signup successfully")
            navigate('/login')
        }
        catch(error)
        {
            console.log("signup api error",error)
            toast.error("Signup Failed")
            navigate("/signup")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function login(email, password, navigate)
{
    return async (dispatch) =>{
        const toastId = toast.loading('loading...')
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", LOGIN_API , {
                email,
                password 

            })

            console.log("LOGIN API response", response)

            if(!response.data.success)
            {
                throw new Error(response.data.message)

            }

            toast.success("Login successfully")

            dispatch(setToken(response.data.token))

            const userImage = response.data?.user?.image 
                            ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response.data.user, image: userImage }))

            

            localStorage.setItem("token",JSON.stringify(response.data.token ))

            localStorage.setItem("user",JSON.stringify(response.data.user))

            navigate('/dashboard/my-profile')
        }

        catch(error)
        {
            console.log("Login api error",error)
            toast.error("Login failed")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
}


export function logout (navigate)
{
    return ( dispatch )=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("logged out ")
        navigate("/")
    }
}



export function getPasswordResetToken( email , setEmailSent )
{
    return async (dispatch ) =>{
        dispatch(setLoading (true))
        try{
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, { email })

            console.log("resetpassword token response ",response)

            if(! response.data.success)
            {
                throw new Error(response.data.message)

            }
            toast.success("Reset Email sent")
            setEmailSent(true)

        }catch(error)
        {
          console.log("reset password token error  ")
          toast.error("Failed to send email for resetting password")
        }

        dispatch(setLoading(false))
    }
}

export function resetPassword(password, confirmPassword,token)
{
     return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword,token})

            console.log("reset password response...",response)

            if(!response.data.success)
            {
                throw new Error(response.data.message)

            }

            toast.success("password has been reset successfully")
        }
        catch(error)
        {
            console.log("reset password token error",error)
            toast.error("unable to reset password")
        }
        dispatch(setLoading(false))
     }
}