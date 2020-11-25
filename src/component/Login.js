import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import fire from "../firebase";

function Login(props) {
  const [User, setUser] = React.useState(false);
  const [Email, setEmail] = React.useState();
  const [Password, setPassword] = React.useState();
  const [emailError, setEmailError] = React.useState();
  const [passwordError, setpasswordError] = React.useState();
  const [hasAccount, setHasAccount] = React.useState();
  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  const clearError = () => {
    setEmailError("");
    setpasswordError("");
  };
  const handlelogin = () => {
    clearError();
    fire
      .auth()
      .signInWithEmailAndPassword(Email, Password)
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setpasswordError(err.message);
            break;
        }
      });
  };
  const handleSignup = () => {
    clearError();
    fire
      .auth()
      .createUserWithEmailAndPassword(Email, Password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setpasswordError(err.message);
            break;
        }
      });
  };
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError ?
            <Form.Text className="text-muted">{emailError}</Form.Text>
           :
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          }
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Form.Text className="text-muted">{passwordError}</Form.Text>
        </Form.Group>
        <Button variant="primary" onClick={handlelogin}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
