const express =  require('express');
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer')
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


app.post("/",(req,res)=>{
    const input = req.body
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth : {
            user:process.env.GOOGLE_EMAIL,
            pass:process.env.GOOGLE_PASSWORD
        }
    });
    let mailOptions = {
        from:process.env.GOOGLE_EMAIL,
        to:`${input.email}`,
        subject:`${input.email}'dan Size Bir Mesaj Var`,
        html: `
        
        <h4>Gönderen İsim : ${input.name}</h4>
        <h4>Gönderen E-Posta : ${input.email}</h4>
        <h4>Konu : ${input.subject}</h4>
        <h4>Mesajı : ${input.message}</h4>
        
    
        `
    };

    transporter.sendMail(mailOptions,(err,data)=>{
        if(err) console.log(err)
        else {
        res.send({
            message:"succesfully send"
        })
        
        }
        })
    res.send({
        message:"success",
        data:input
    })

    console.log(input);
})


app.listen(4050,()=>{
    console.log("server")
})