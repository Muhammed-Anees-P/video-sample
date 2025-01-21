import "./App.css";
import AdminPanal from "./components/AdminPanal";
import ForgotPassword from "./components/ForgotPassword";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin/*" element={<AdminPanal />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} />  
        </Routes>
      </Router>
    </>
  );
}

export default App;
