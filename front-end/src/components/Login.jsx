import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication (replace with actual API call)
    if (email === "admin@gmail.com" && password === "admin123") {
      console.log("Login successful");
      navigate("/admin"); // Redirect to admin page
    } else {
      alert("Invalid email or password!");
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
