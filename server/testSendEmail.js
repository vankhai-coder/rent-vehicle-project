import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({path : '../.env'})

async function sendEmail() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    let mailOptions = {
        from: process.env.EMAIL,
        to: 'vankhai.codeasdfr@gmail.com',
        subject: 'Hello from nodemailer',
        text: 'This is a test mail sending using Nodemailer!'
    }

    try {
        let info =await transporter.sendMail(mailOptions)
        console.log("Email sent : ", info.messageId)
    } catch (error) {
        console.log("Error when sending email : ", error);

    }
}
sendEmail()
