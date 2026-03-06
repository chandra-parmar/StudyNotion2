const cloudinary = require('cloudinary').v2

const uploadImageToCloudinary = async(file,folder,height,quality)=>{
    try{
        const options ={folder}
        if(height)
        {
            options.height = height
        }
        if(quality)
        {
            options.quality = quality
        }

     return await cloudinary.uploader.upload(file.tempFilePath,options)

    }catch(error){
      console.error(error)
    }
}

module.exports = uploadImageToCloudinary