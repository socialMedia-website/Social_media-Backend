const nodemailer= require('nodemailer');
const sendgrid=require('nodemailer-sendgrid-transport');
const transporter= nodemailer.createTransport(sendgrid({
    auth:{
        api_key:process.env.TRANSPORTER_KEY
    }
}));
const sendEmail = function (email,message){
    transporter.sendMail({
        to:email,
        from:process.env.ownerEmail,
        subject:'Reset password',
        html: message
    })
    };
    module.exports=sendEmail;
