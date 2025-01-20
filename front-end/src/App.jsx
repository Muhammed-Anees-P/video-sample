import "./App.css";
import AdminPanal from "./components/AdminPanal";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/*" element={<AdminPanal />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
