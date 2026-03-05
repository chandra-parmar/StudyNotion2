const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
     lastName:{
        type:String,
        required:true,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        unqiue:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:3
    },
    accountType:{
        type:String,
        enum:['Admin','Student','Instructor'],
        required:true
    },
    image:{
        type:String,

    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'CourseProgress'
        }
    ]
    

})

module.exports= mongoose.model('User',userSchema)