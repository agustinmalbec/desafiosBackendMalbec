import { Router } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const mailRouter = Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

mailRouter.get('/mail', (req, res) => {
    const mailOptions = {
        from: `Ecommerce`,
        to: process.env.EMAIL,
        subject: 'Test',
        html: '<h1>HTML</h1>',
        attachments: [],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            req.logger.warn(error);
        }
        req.logger.info('Email sent: ' + info.response);
    });

    res.send('Sended');
});