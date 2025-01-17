const express = require('express')
const router = express.Router()
const videoModel = require('../models/videoModel')
const path = require('path')



//multer
const multer = require('multer')
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        
        callback(null,path.join(__dirname,'../public/uploads'))
    },
    filename: (req, file, callback) => {
        const sanitizedFilename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
        callback(null, sanitizedFilename); 
    }
})

const upload =multer({storage})



//add videos
router.post('/videos', upload.array('image'),async (req, res) =>{
    try{
        const {title, description, videoLink} = req.body;
        const image = req.file?.path

        if(!title || !description  || !videoLink){
            return res.status(400).json({message:"All fields are required"})
        }   
 
        if (req.files[0] == undefined) {          
            return res.send("image required");
          }

        const imagePaths = req.files.map((file) => `uploads/${file.filename}`);

        const newVideo = new videoModel({
            title,
            description,
            image:imagePaths ,
            videoLink
        })      

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
        const videos = await videoModel.find()
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
        const {title, description, videoLink} = req.body;
        if(!title || !description  || !videoLink){
            return res.status(400).json({message:"All fields are required"})
        } 

        const imagePaths = req.files.map((file) => `uploads/${file.filename}`);
        const updatedVideo = await videoModel.findByIdAndUpdate(id,
            {title,description,image:imagePaths,videoLink},
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