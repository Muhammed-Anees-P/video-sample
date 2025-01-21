import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api/api";

function AddVideo() {
  console.log('Add video page loading');

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [videoLink, setVideoLink] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoLink", videoLink);

    if (image) {
      formData.append("image", image);
    }


    try {
      const response = await axios.post(`${apiUrl}/videos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true
      });

      console.log("Video added", response.data);
      window.alert("Video added successfully!");
      navigate("/admin/view-video");
    } catch (error) {
      console.log("Error adding video", error);
      window.alert("Failed to add video.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Enter video title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="Enter video description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
          placeholder="Choose image"
          type="file"
          onChange={handleFileChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Video Link</Form.Label>
        <Form.Control
          placeholder="Enter video link"
          onChange={(e) => setVideoLink(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
      <Button type="reset" className="ms-4 btn btn-danger">
        Reset
      </Button>
    </Form>
  );
}

export default AddVideo;
