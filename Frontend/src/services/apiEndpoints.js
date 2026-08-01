const BASE_URL = process.env.BASE_URL
//auth endpoints
export const authEndpoints ={

    SENDOTP_API : "http://localhost:4000/api/v1/auth/sendotp",
    SIGNUP_API : "http://localhost:4000/api/v1/auth/signup",
    LOGIN_API : "http://localhost:4000/api/v1/auth/login",
    RESETPASSWORDTOKEN_API :  "http://localhost:4000/api/v1/auth/reset-password-token",
    RESETPASSWORD_API : "http://localhost:4000/api/v1/auth/reset-password"
} 

export const profileEndpoints ={
    GET_USER_ENROLLED_COURSES_API : "http://localhost:4000/api/v1/profile/enrolledCourses",

}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API:  "http://localhost:4000/api/v1/category/",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",

  
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
}