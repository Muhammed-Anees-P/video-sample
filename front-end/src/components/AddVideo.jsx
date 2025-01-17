import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


function AddVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [videoLink, setVideoLink] = useState("");


  const handleFileChange = (e) =>{
    setImage(e.target.files[0])
  }

 const formData = new FormData()
 formData.append("title", title)
 formData.append("description", description)
 formData.append("videoLink", videoLink)

 if(image){
    formData.append("image", image)
 }
 const navigate = useNavigate(); 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://video-sample.onrender.com/api/videos", formData,{
       headers:{
        "Content-Type":"multipart/form-data"
       }
      });
      console.log("video added" , response.data)
      window.alert("Video added successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label> Title</Form.Label>
          <Form.Control
            placeholder="Enter video title"
            onChange={(e) => setTitle(e.target.value)} required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Description</Form.Label>
          <Form.Control
            placeholder="Enter video description"
            onChange={(e) => setDescription(e.target.value)} required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Image</Form.Label>
          <Form.Control placeholder="l" type="file" onChange={handleFileChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Video Link</Form.Label>
          <Form.Control
            placeholder="Enter video Link"
            onChange={(e) => setVideoLink(e.target.value)} required
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
        <Button type="reset" className="ms-4 btn btn-danger">
          Reset
        </Button>
      </Form>

    </>
  );
}

export default AddVideo;
