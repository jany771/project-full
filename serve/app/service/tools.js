const {Service} = require('egg')
const nodemailer = require('nodemailer')

const userEmail = 'zhjnjn93@163.com'
const transporter = nodemailer.createTransport({
    service:"163",
    secureConnection:true,
    auth:{
        user:userEmail,
        pass:'543193742@qq.com'
    }
})

class ToolService extends Service{
    async sendMail(email, subject,text, html){
        const mailOptions = {
            from: userEmail,
            cc:userEmail,//给自己发送
            to:email,
            subject,
            text,
            html
        }
        try{
            await transporter.sendMail(mailOptions);
            return true;
        }catch(err){
            console.log('email error',err)
            return false;
        }
    }
}

module.exports = ToolService;