import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from 'react-router-dom'

function EditVideo() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [videoLink, setVideoLink] = useState("");

    useEffect(() =>{
        fetchVideos()
    },[])

    const fetchVideos = async () =>{
        try{
            const response = await axios.get(`https://video-sample.onrender.com/api/videos/${id}`)
            const video = response.data
            setTitle(video.title)
            setDescription(video.description)
            setVideoLink(video.videoLink)

        }catch(error){
            console.log("error fetching videos", error);
            
        }
    }

    const  handleFileChange = (e) =>{
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("videoLink", videoLink)

        if(image){
            formData.append("image", image)
        }

        try{
            await axios.put(`https://video-sample.onrender.com/api/videos/${id}`, formData , {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            })
            window.alert("Video updated successfully!");
            navigate('/')
        }catch(error){
            console.log("error updating the video", error);
            
        }
    }
  return (
    <div>
        <h2>Edit Video</h2>
         <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label> Title</Form.Label>
          <Form.Control
            placeholder="Enter video title" value={title}
            onChange={(e) => setTitle(e.target.value)} required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Description</Form.Label>
          <Form.Control
            placeholder="Enter video description" value={description}
            onChange={(e) => setDescription(e.target.value)} required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Image</Form.Label>
          <Form.Control placeholder="l" type="file" onChange={handleFileChange}  required  />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Video Link</Form.Label>
          <Form.Control
            placeholder="Enter video Link" value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)} required
          />
        </Form.Group>
        <Button type="submit">Save changes</Button>
        <Button type="reset" className="ms-4 btn btn-danger">
          Reset
        </Button>
      </Form>
    </div>
  )
}

export default EditVideo
