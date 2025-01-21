import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { apiUrl } from "../../api/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpError, setOtpError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const navigate = useNavigate();

  
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("OTP sent to your email!");
      setOtpError('')
      setStep(2); //move to reset
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError("Admin email not found")
      setTimeout(() => {
        setOtpError('')
      }, 3000);
    }
  };

  // resetting the password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
    //   alert("Passwords do not match!");
    setPasswordError("Password do no match");
    setTimeout(() => {
        setPasswordError("")
    }, 3000);
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/reset-password`,
        { otp, newPassword, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Password reset successfully!");
      setPasswordError("")
      navigate("/");
    } catch (error) {
      console.error("Error resetting password:", error);
      if(error.response?.data?.message === " OTP does not match"){
            setOtpError('OTP does not match!')
            setTimeout(() => {
                setOtpError("")
            }, 3000);
      }else{
        setPasswordError('Failed to reset Password')
        setTimeout(() => {
            setPasswordError("")
        }, 3000);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Form
        style={{ width: "400px" }}
        onSubmit={step === 1 ? handleSendOtp : handleResetPassword}
      >
        <h2 className="text-center mb-4">Forgot Password</h2>

      
        {step === 1 && (
          <>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {otpError && <p className="text-danger">{otpError}</p>}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Send OTP
            </Button>
          </>
        )}

       
        {step === 2 && (
          <>
            <Form.Group className="mb-3" controlId="formOtp">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>
            {otpError && <p className="text-danger">{otpError}</p>}


            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            {passwordError && <p className="text-danger"> {passwordError}</p>}

            <Button variant="primary" type="submit" className="w-100">
              Reset Password
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default ForgotPassword;
