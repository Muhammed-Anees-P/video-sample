const express = require('express')
const router = express.Router()
const videoModel = require('../models/videoModel')
const path = require('path')



//multer
const multer = require('multer')
const { default: mongoose } = require('mongoose')
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,path.join(__dirname,'../public/uploads'))
    },
    filename:(req,file,callback)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

// const upload =multer({storage})
const upload =multer({storage})



//add videos
router.post('/videos', upload.array('image'),async (req, res) =>{
    try{
        const {title, description, videoLink, imageUrl, type} = req.body;
        const admin = req.session.adminId

        // console.log(admin);
        
        //youtube imageurl
        const youtubeVideoId = `https://img.youtube.com/vi/${imageUrl}/hqdefault.jpg`

        if(!title || !description  || !videoLink || !type){
            return res.status(400).json({message:"All fields are required"})
        }   
 
        // if(!admin){
        //     return res.status(400).json({message:"Admin not authenticated"})
        // }

        const isAdmin = new mongoose.Types.ObjectId(admin)

        const imagePaths = req.files ? req.files.map(file => `../uploads/${file.filename}`) : [];
        
 
    
        const newVideo = new videoModel({
            title,
            description,
            image: imagePaths,
            videoLink, 
            createdBy:isAdmin,
            imageUrl:youtubeVideoId,
            type
        })

        if (req.files[0] == undefined) {          
            return res.send("image required");
          }

      

        await newVideo.save()
        res.status(201).json({message:"video added successfully", video:newVideo})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"}) 
        
    }
})


//get all videos
router.get('/videos' ,  async (req,res) =>{
    try{
        // const admin = req.session.adminId

        // if(!admin){
        //     return res.status(400).json({message:"Admin not authenticated"})
        // }
        const {type} = req.query
        const filter = type ? {type} : {}
        const videos = await videoModel.find(filter)
        res.status(201).json(videos)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"internal server error"})
        
    }
})


//get single video by id
router.get('/videos/:id', async (req,res) =>{
    try{
        const videoId = req.params.id
        // const admin = req.session.adminId

        // if(!admin){
        //     return res.status(400).json({message:"Admin not authenticated"})
        // }
        const video = await videoModel.findById(videoId)
        if(!video){
            return res.status(404).json({message:"video not found"})
        }
        res.status(201).json(video)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
})

//update video by id
router.put('/videos/:id', upload.array('image'), async (req,res) =>{
    try{
        const {id} = req.params
        const {title, description, videoLink, imageUrl, type} = req.body;
        const admin= req.session.adminId

        //youtube imageurl
        const youtubeVideoId = `https://img.youtube.com/vi/${imageUrl}/hqdefault.jpg`

        // if(!admin){
        //     return res.status(400).json({message:"Admin not authenticated"})
        // }

        if(!title || !description  || !videoLink || !type){
            return res.status(400).json({message:"All fields are required"})
        } 

        const isAdmin = new mongoose.Types.ObjectId(admin)

        const imagePaths = req.files ? req.files.map(file => `../uploads/${file.filename}`) : [];
        const updatedVideo = await videoModel.findByIdAndUpdate(id,
            {title,description,image:imagePaths,videoLink, createdBy:isAdmin, imageUrl:youtubeVideoId,type},
            {new:true}
        )
        if(!updatedVideo){
            return res.status(404).json({message:"Video not found"})
        }
        
        res.status(201).json({message:"video updated successfully", video:updatedVideo})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
})

//delete video by id
router.delete('/videos/:id', async (req,res) =>{
    try{
        const {id} = req.params
        const admin= req.session.adminId

        // if(!admin){
        //     return res.status(400).json({message:"Admin not authenticated"})
        // }
        const deleteVideo = await videoModel.findByIdAndDelete(id)
        if(!deleteVideo){
            return res.status(404).json({message:"Video not found"})
        }

        res.status(201).json({message:"video deleted successfully", video:deleteVideo})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
})

module.exports = router