import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api/api";
import Swal from 'sweetalert2'
import { Form } from "react-bootstrap";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/videos`);
      setVideos(response.data);
      console.log(response.data, "response data")
    } catch (error) {
      console.log("Error fetching videos", error);
    }
  };

  const handleDeleteVideo = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if(result.isConfirmed) {
        try {          
        const response = await axios.delete(`${apiUrl}/videos/${id}`,{
          withCredentials:true
        });
        if (response.status === 201) {
          Swal.fire("Deleted!", "Your video has been deleted.", "success");
          fetchVideos();
        } else {
          Swal.fire("Error!", "Unable to delete the video.", "error");
        }
      } catch (error) {
        console.log("Error deleting video", error);
      }
      }
    })
  };

  const handelWatchVideo = (videoLink) => {
    window.open(videoLink);
  };

  const handleEditVideo = (id) => {
    navigate(`/admin/edit-video/${id}`);
  };

  const filtervideos = videos.filter((video) => {
    if(filter === 'mobile') {
      return video.type === 'mobile'
    }else if (filter === "web") {
      return video.type === "web";
    }
    return true;
  }).filter((video) => {
    return (
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "60%" }}
        />
        <Form.Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: "35%" }}
        >
          <option value="all">All</option>
          <option value="mobile">Mobile</option>
          <option value="web">Web</option>
        </Form.Select>
      </div>
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {filtervideos.length === 0 ? (
          <p>No video Available</p>
        ) : (
          filtervideos.map((video) => (
            <Card key={video._id} className="me-3" style={{ width: "18rem" }}>
              {/* <Card.Img
                variant="top"
                src={
                  video.image.length > 0
                    ? `https://video-sample.onrender.com/${video.image[0]}`
                    : ""
                }
                alt={video.title}
              /> */}
                <Card.Img
                variant="top"
                src={
                  video.image.length > 0
                    ? `${video.imageUrl}`
                    : ""
                }
                alt={video.title}
              />
              
              {/* <Card.Img
                variant="top"
                src={
                  video.image
                    ? `http://localhost:5000/uploads/${video.image}`
                    : ""
                }
                alt={video.title}
              /> */}
              

              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
                <Card.Text>
                  {video.description.length > 100
                    ? `${video.description.slice(0, 100)}....`
                    : video.description}
                </Card.Text>
                <Button
                  onClick={() => handleDeleteVideo(video._id)}
                  variant="danger"
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  className="ms-1"
                  onClick={() => handelWatchVideo(video.videoLink)}
                >
                  Watch
                </Button>
                <Button
                  variant="secondary"
                  className="ms-1"
                  onClick={() => handleEditVideo(video._id)}
                >
                  Update
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default VideoList;
