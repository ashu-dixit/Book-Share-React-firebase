import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";

function Login(props) {
  const {
    Email,
    setEmail,
    Password,
    setPassword,
    handlelogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    setEmailError,
    passwordError,
    setpasswordError
 } = props
  const hello = (value) => {
      console.log(value);
  }
  return (
    <div>
      
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
          <Form.Text className="text-muted">
            {emailError}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={(event) => setPassword(event.target.value)}/>
          <Form.Text className="text-muted">
            {passwordError}
          </Form.Text>
        </Form.Group>
        <Button variant="primary"  onClick={handlelogin}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
