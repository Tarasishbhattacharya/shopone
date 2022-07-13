const nodemailer=require("nodemailer");


const sendemail=async(option)=>{
    const transporter=nodemailer.createTransport({
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    })

    const mailoption={
        from:process.env.SMTP_MAIL,
        to:option.email,
        subject:option.subject,
        text:option.message
    }
    await transporter.sendMail(mailoption)
}
module.exports=sendemail