import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiUrl } from '../../api/api';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    try{
      const response = axios.post(`${apiUrl}/login`, {
        headers:{
          "Content-Type":"application/json"
        },
        params:{
          email,
          password
        }
      })

      if(response.status === 200){
        console.log('Login success');
        navigate('/admin')
        
      }
    }catch(error){
      console.log(error)
    }
  };

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
    
                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
    
                <div className="text-center mt-3">
                  <Button variant="link" href="/forgot-password">
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
