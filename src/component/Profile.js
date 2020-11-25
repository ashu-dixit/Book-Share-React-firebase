import { Avatar, Badge, TextField } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import fire from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import MyBooks from "./MyBooks";
export default function ButtonAppBar(props) {
  const [User] = useAuthState(fire.auth());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const onSubmit = () => {
    fire.auth().currentUser.updateEmail(email);
    fire.auth().currentUser.updatePhoneNumber(phoneNo);
    fire.auth().currentUser.updateProfile({
      displayName: name,
      photoURL: User.photoURL,
    });
    alert("Profile Saved");
  };
  useEffect(() => {
    // setUser(fire.auth().currentUser);
  }, []);
  const ProfileData = () => {
    switch (User) {
      case null:
        return "Login first";
      case false:
        return "Loading....";
      default:
        return (
          <div>
            <Container>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <Image src={User ? User.photoURL : "NA"} roundedCircle />
              </Row>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={User ? User.displayName : "NA"}
                    placeholder="Enter Name"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={User ? User.email : "NA"}
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Enter Your Phone number"
                    onChange={(e) => setPhoneNo(e.target.value)}
                    defaultValue={User ? User.phoneNumber : "NA"}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onSubmit}>
                  Save
                </Button>
              </Form>
              <Row>
                <Col>
                  <h2>
                    <br />
                    <br />
                    <br />
                    <Badge
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        justifyItems: "center",
                      }}
                      variant="secondary"
                    >
                      Your Books
                    </Badge>
                  </h2>
                  <br />
                  <br />
                  <br />
                  <MyBooks />
                </Col>
                <Col>
                  <h2>
                    <br />
                    <br />
                    <br />
                    <Badge
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        justifyItems: "center",
                      }}
                      variant="secondary"
                    >
                      Your Favorites
                    </Badge>
                  </h2>
                  <br />
                  <br />
                  <br />
                </Col>
              </Row>
            </Container>
          </div>
        );
    }
  };

  return ProfileData();
}
