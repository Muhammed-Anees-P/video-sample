import React from 'react'
import {BrowserRouter as Router, Route,Routes, Link} from 'react-router-dom'
import VideoList from './VideoList'
import AddVideo from './AddVideo'
import { VideoLibrary, AddCircle } from '@mui/icons-material';
import EditVideo from './EditVideo';



function AdminPanal() {
  return (
    <>  
    <Router>
      <div className="admin-dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebarWrapper">
            {/* Video Collections Collection */}
            <div className="sidebarMenu">
              <h3 className="sidebarTitle">Video Collections</h3>
              <ul className="sidebarList">
                {/* View Video Subcollection */}
                <Link to="/" className="link">
                  <li className="sidebarListItem">
                    <VideoLibrary className="sidebarIcon" />
                    View Video
                  </li>
                </Link>
                {/* Add Video Subcollection */}
                <Link to="/add-video" className="link">
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
            <div className="topbarWrapper">
              <div className="topLeft">
                <span className="logo">Admin Panel</span>
              </div>
            </div>
          </div>

          {/* Main Routes */}
          <div className="container mt-4">
            <h2 className="text-center mb-4">Video Management</h2>
            <Routes>
              <Route path="/" element={<VideoList />} />  
              {/* View Videos page */}
              <Route path="/add-video" element={<AddVideo />} />  
              {/* Add Video page */}
              <Route path='/edit-video/:id' element={<EditVideo/>} /> 
              {/* Edit Video page */}
            </Routes>
          </div>
        </div>
      </div>
      
    </Router>
    </>
   )
 }

export default AdminPanal





