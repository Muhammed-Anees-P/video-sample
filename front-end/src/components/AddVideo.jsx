import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api/api";
import Swal from "sweetalert2";


function AddVideo() {
  console.log('Add video page loading');

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("")
  const [videoLink, setVideoLink] = useState("");
  const [type, setType] = useState('')

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
    formData.append('imageUrl', imageUrl)

    if (image) {
      formData.append("image", image);
    }

    if(type) {
      formData.append('type', type)
    }


    try {
      const response = await axios.post(`${apiUrl}/videos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true
      });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Video added successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/admin/view-video");
    } catch (error) {
      console.log("Error adding video", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add video. Please try again.",
      });
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
        <Form.Label>image Url</Form.Label>
        <Form.Control
          placeholder="Enter video id"
          onChange={(e) => setImageUrl(e.target.value)}
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
      <Form.Group className="mb-3">
      <Form.Label>Type</Form.Label>
        <div className="mb-2">
        <Form.Check
           type="checkbox"
           label="Web"
           value="web"
           checked={type === "web"}
           onChange={(e) => setType(e.target.checked ? "web" : "")}
         />
        </div>
       <div>
       <Form.Check
            type="checkbox"
            label="Mobile"
            value="mobile"
            checked={type === "mobile"}
            onChange={(e) => setType(e.target.checked ? "mobile" : "")}
          />
         </div>
        </Form.Group>

      <Button type="submit">Submit</Button>
      <Button type="reset" className="ms-4 btn btn-danger">
        Reset
      </Button>
    </Form>
  );
}

export default AddVideo;
