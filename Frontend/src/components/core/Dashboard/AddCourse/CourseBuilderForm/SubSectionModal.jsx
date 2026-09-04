import { useSelector } from "react-redux"
import { RxCross2 } from "react-icons/rx"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { setCourse } from "../../../../../reducer/slices/courseSlice"
import { useEffect } from "react"
import toast from 'react-hot-toast'
import IconBtn from "../../../../common/IconBtn"
import{createSubSection,  updateSubSection  } from '../../../../../services/operations/courseDetailsAPI'
import MediaUpload from "../MediaUpload"


const SubSectionModal = ({
                    modalData,
                    setModalData,
                    add= false,
                    view = false,
                    edit = false
                })=> {
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors},
        getValues
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading ] = useState(false)
    const { course} = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)

    useEffect(()=> {
         if( view || edit)
         {
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
         }
    },[])

    const isFormUpdated =  (data)=>{
        const currentValues = getValues()

        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl 
        )
        {
            return true
        }
 
        else{
            return false
        }
    }

    const handleEditSubSection = async()=> {

        const currentValues = getValues()
        const formData = new FormData()

        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)

        if(currentValues.lectureTitle !== modalData.title)
        {
            formData.append("title",currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description)
        {
            formData.append("description", currentValues.lectureDesc)
        }
        if(currentValues.lectureVideo !== modalData.videoUrl)
        {
            formData.append("video", currentValues.lectureVideo)

        }

        setLoading(true)

        //api call updatesubSection 
        const result = await updateSubSection(formData, token )



        if(result)
        {
            const updatedCourseContent = course.courseContent.map((section)=>
            section._id === modalData ? result : section)
            const updatedCourse = {...course, courseContent: updatedCourseContent }
            
            dispatch(setCourse(updatedCourse))
        }

        setModalData(null)
        setLoading(false)

    }

    const onSubmit = async( data )=> {

        if(view)
        {
            return
        }

        if(edit)
        {
            if(!isFormUpdated())
            {
                toast.error("No changes made to the form")
            }
            else
            {
                handleEditSubSection()
            }
            return 
        }
    

    //add

    const formData = new FormData()

    formData.append("sectionId", modalData )
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)



    setLoading(true)

  
    
  
    //api call

    const result = await createSubSection(formData, token)

    if(result)
    {
        const updatedCourseContent = course.courseContent.map((section)=> 
        section._id === modalData ? result : section )
        const updatedCourse = { ...course, courseContent: updatedCourseContent }

        dispatch(setCourse( updatedCourse ))
    }

    setModalData(null)
    setLoading(false)

}




    return(

        <div>
            
            <div>
                <p>{ view && "Viewing"} {add && "Adding"} { edit && "Editing" }</p>
                <button onClick={ ()=> (!loading ? setModalData (null) : {})}>
                   <RxCross2 />
                </button>
            </div>

            {/* form  */}
             <form onSubmit ={ handleSubmit(onSubmit)}>
                   <MediaUpload 
                     name="lectureVideo"
                     label="lecture Video" 
                     register={ register} 
                     setValue={ setValue}
                      errors={ errors}
                      video={ true}
                       viewData={ view ? modalData.videoUrl : null }
                       editData = { edit ? modalData.videoUrl : null }></MediaUpload>

                       <div>
                          <label>Lecture title</label>
                          <input
                           id='lectureTitle'
                           placeholder="Enter lecture Title"
                           {... register("lectureTitle", { required:true})}
                            className="w-full text-black"></input>

                            {
                                errors.lectureTitle && (
                                    <span>Lecture Title is required </span>
                                )
                            }

                       </div>

                       {/* description */}
                       <div>
                         <label> Lecture Description </label>
                         <textarea id='lectureDesc' 
                          placeholder="Enter lecture Description"
                          {...register ("lectureDesc",{ required:true}) }
                           className="w-full min-h-[130px] text-black "></textarea>
                           
                           {
                             errors.lectureDesc && (<span>
                                Lecture Description is required 
                             </span>)
                           }

                        

                       </div>

                       {/* button  */}
                       {
                        !view && (
                            <div>
                                <IconBtn
                                 text={ loading ? "loading... ": edit ? "save changes" : "save" }></IconBtn>
                            </div>
                        )
                       }
             </form>

        </div>
    )
}

export default SubSectionModal