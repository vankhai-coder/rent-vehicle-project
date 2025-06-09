import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

export async function sendEmail(receiver, subject, htmlElement) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_SENDER_PASSWORD
        }
    })

    let mailOptions = {
        from: process.env.EMAIL,
        to: receiver,
        subject,
        html: htmlElement
    }

    try {
        let info = await transporter.sendMail(mailOptions)
        console.log("Email sent : ", info.response)
    } catch (error) {
        console.log("Error when sending email : ", error);

    }
}
