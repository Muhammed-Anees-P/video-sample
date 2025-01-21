import React from 'react'
import {BrowserRouter as Router, Route,Routes, Link, useNavigate} from 'react-router-dom'
import VideoList from './VideoList'
import AddVideo from './AddVideo'
import { VideoLibrary, AddCircle } from '@mui/icons-material';
import './adminPanal.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { apiUrl } from '../../api/api';
import EditVideo from './EditVideo';
import ForgotPassword from './ForgotPassword';




function AdminPanal() {

  const navigate = useNavigate()
  const handleLogout = async () =>{
    try{
      const response = await axios.post(`${apiUrl}/logout`)
      alert('Successfully logout')
      navigate('/')

    }catch(err){
      console.log(err);
      alert('Logout faild. Please try again')
      
    }
  }

  
  return (
    <>  
    
      <div className="admin-dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebarWrapper">
            {/* Video Collections Collection */}
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Video Collections</h3>
              <ul className="sidebarList">
                {/* View Video Subcollection */}
                <Link to="/admin/view-video" className="link">
                  <li className="sidebarListItem">
                    <VideoLibrary className="sidebarIcon" />
                    View Video
                  </li>
                </Link>
                {/* Add Video Subcollection */}
                <Link to="/admin/add-video" className="link">
                  <li className="sidebarListItem">
                    <AddCircle className="sidebarIcon" />
                    Add Video
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="main-content">
          {/* Topbar */}
          <div className="topbar">
            <div className="topbarWrapper d-flex justify-content-between w-100">
              <div className="topLeft">
                <span className="logo">Admin Panel</span>
              </div>
              <div >
                <Button variant="outline-warning" onClick={handleLogout}>Logout</Button>
              </div>
            </div>
          </div>

          {/* Main Routes */}
          <div className="container mt-4">
            <h2 className="text-center mb-4">Video Management</h2>
            <Routes>
              <Route path="/view-video" element={<VideoList />} />  {/* View Videos page */}
              <Route path="/add-video" element={<AddVideo />} />  {/* Add Video page */}
              <Route path="/edit-video/:id" element={<EditVideo />} />  {/* edit Video page */}
            </Routes>
          </div>
        </div>
      </div>
   
    </>
   )
 }

export default AdminPanal





