const express = require('express')
const router = express.Router()
const userModel = require('../models/adminModel')
const adminModel = require('../models/adminModel')
require('dotenv').config()



//admin login
router.get('/login', async(req,res) =>{
    try{
        //fetch data from body
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({message:'email and password filed is required'})
        }

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        //validate admin details
        if(email !== adminEmail || password !== adminPassword){
            return res.status(401).json({message:"invalid email or password"})
        }

        const admin = await adminModel.findOne({email:adminEmail})
        if(!admin){
            return res.status(400).json({message:"Admin not found"})
        }
        req.session.adminId =admin._id 

        // console.log(req.session.adminId);
        
        res.status(200).json({message:'Login successfull...!'})

    }catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
})

//admin logout
router.post('/logout', async(req,res) =>{
    try{
        req.session.destroy((err) =>{
            if(err) {
                console.log("Logout error", err);
                
            }
            res.clearCookie('connect.sid')
            res.status(200).json({message:"Logout successfull"})
        })
    }catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
        
    }
})


module.exports = router