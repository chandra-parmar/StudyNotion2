const nodemailer = require('nodemailer')

const mailSender = async(email,title,body)=>{
    try{

        //create transporter 
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:'StudyNotion || by -Chandra parmar',
            to:`${email},`,
            subject:`${title}`,
            html:`${body}`
        })

        console.log(info)

    }catch(err)
    {
       console.error(err)
    }
}

module.exports = mailSender