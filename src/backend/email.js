import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: 'gmail',
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_SEND,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (subject, content) => {

    const emailBody = {
        from: process.env.EMAIL_SEND,
        to: process.env.EMAIL_RECEIVE,
        subject: subject,
        text: null,
        html: content
    }

    // tenta enviar o email
    try {
        const info = await transporter.sendMail(emailBody);
        console.log(info.messageId);
    } catch (error) {
        console.log(error);
    }
}


