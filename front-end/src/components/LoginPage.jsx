import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiUrl } from '../../api/api';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${apiUrl}/login`, {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        if (response.status === 200) {
            console.log('Login success');
            setError("")
            navigate('/admin');
        }
    } catch (error) {
        console.log("Login Error:", error.response?.data?.message || "Something went wrong");
        setError("Invalid details..!")
        setTimeout(() => {
          setError("")
        }, 3000);
    }
};

const handleResetPassword = () =>{
  navigate('/forgot-password')
}



  return (
     <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Row className="w-100">
            <Col md={6} lg={4}>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
    
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                {error && <p className='text-danger'>{error}</p>}
    
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
    
                <div className="text-center mt-3">
                  <Button variant="link" onClick={handleResetPassword}>
                    Forgot Password?
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
  );
}

export default LoginPage;
