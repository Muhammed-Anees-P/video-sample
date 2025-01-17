import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("https://video-sample.onrender.com/api/videos");
      setVideos(response.data);
    } catch (error) {
      console.log("Error fetching videos", error);
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      const response = await axios.delete(
        `https://video-sample.onrender.com/api/videos/${id}`
      );
      console.log("delete", response.data);
      fetchVideos();
    } catch (error) {
      console.log("Error deleting video", error);
    }
  };

  const handelWatchVideo = (videoLink) => {
    window.open(videoLink);
  };

  const handleEditVideo = (id) => {
    navigate(`/edit-video/${id}`);
  };

  const photo = videos.map((i) => {
    console.log("image : ", i.image);
  });

  return (
    <div className="container">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {videos.length === 0 ? (
          <p>No video Available</p>
        ) : (
          videos.map((video) => (
            <Card className="me-3" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={
                  video.image.length > 0
                    ? `https://video-sample.onrender.com/${video.image[0]}`
                    : ""
                }
                alt={video.title}
              />
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
