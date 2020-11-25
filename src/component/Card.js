import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Card, Col, Container, Modal, Row, Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import fire from "../firebase";
import firebase from "firebase";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "34ch",
    margin: theme.spacing(3),
  },
  media: {
    height: 4,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  icon:{
    
  },
  iconColor:{
    color:"Red"
  }
}));

export default function BookCard(props) {
  const classes = useStyles();
  const [modalShow, setModalShow] = useState(false);
  const startChat = () => {};
  const [User] = useAuthState(fire.auth());
  const userRef = fire.firestore().collection("users");
  const [open, setOpen] = useState(false)
  const AddTofavorite = () => {
    userRef
      .where("UserID", "==", "" + User.uid)
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          fire
            .firestore()
            .collection("users")
            .doc(doc.id)
            .update({
              favorite: firebase.firestore.FieldValue.arrayUnion(props.id),
            });
          // console.log(doc.id, " => ", doc.data());
        });
        setOpen(!open)
      });
    // userRef.doc(User.uid).update({
    //   favorite: firebase.firestore.FieldValue.arrayUnion(props.id)
    // });
  };

  return (
    <Card
      style={{
        width: "15rem",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <Card.Img variant="top" src={props.imageURL} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.about}</Card.Text>
        <Card.Text>₹: {props.amount}</Card.Text>
        {User ? (
          props.chatoption ? (
            <Container>
              <Row>
                <Col>
                  <IconButton
                    onClick={AddTofavorite}
                    aria-label="add to favorites"
                  >
                    <FavoriteIcon
                      className={clsx(classes.icon, {
                        [classes.iconColor]: open,
                      })}
                    />
                  </IconButton>
                </Col>
                <Col>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                    Chat
                  </Button>
                </Col>
                <ChatWindow
                  show={modalShow}
                  modalShow={modalShow}
                  setModalShow={() => setModalShow(false)}
                />
              </Row>
            </Container>
          ) : (
            <Button
              color="secondary"
              onClick={() => props.deletePost(props.id)}
            >
              Delete
            </Button>
          )
        ) : (
          <div />
        )}
      </Card.Body>
    </Card>
  );
}

function ChatWindow(props) {
  return (
    <Modal
      show={props.modalShow}
      onHide={props.setModalShow}
      // dialogClassName="modal-90w"
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Message Box
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Hello</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
