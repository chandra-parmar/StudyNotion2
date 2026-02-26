
const mongoose= require('mongoose')
require('dotenv').config()


const dbConnect = async()=>{
    try{
      
      await mongoose.connect(process.env.MONGO_URL)
      console.log("database connected successfully")

    }catch(err)
    {
        console.error(err)
        process.exit(1)
    }
}


module.exports = dbConnect