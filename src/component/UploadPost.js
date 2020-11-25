import { TextField } from "@material-ui/core";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";

export default function UploadPostCard(props) {
  const [about, setAbout] = React.useState(null);
  const [User] = userAuthState(fire.auth());
  const uploadDoc = (url) => {
    fire
      .firestore()
      .collection("books")
      .add({
        UploadDate: firebase.firestore.FieldValue.serverTimestamp(),
        UserID: User.id,
        About: about,
        Upvote: 0,
        Comments: {},
      })
      .then((docRef) => {
        setAbout("");
      })
      .catch((err) => alert(err));
  };
  
  return (
    <div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={uploadDoc}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
