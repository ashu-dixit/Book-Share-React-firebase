import Login from "./Login";
import { StyledFirebaseAuth } from "react-firebaseui";
import React, { useEffect } from "react";
import { Container, Modal, Row } from "react-bootstrap";
import { Button, Avatar, Menu, MenuItem, makeStyles } from "@material-ui/core";
import firebase from "firebase";
import fire from "../firebase";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function UserIcon(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [modalShow, setModalShow] = React.useState(false);

  const classes = useStyles();
  const handleModalOpen = () => {
    setModalShow(true);
    console.log(props.data);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    fire.auth().signOut();
  };
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => {},
    },
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Login />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <Button color="primary" onClick={handleModalClose}>
        Close
      </Button>
    </div>
  );

  const userIcon = () => {
    switch (props.data) {
      case false:
        return <div>loading...</div>;
      case null:
        return (
          <div>
            <Button
              color="inherit"
              onClick={() => {
                handleModalOpen();
              }}
            >
              Login
            </Button>
              <Modal style={{width:"100%"}} show={modalShow} onHide={setModalShow} size="sm" centered>
                {body}
              </Modal>
          </div>
        );
      default:
        return (
          <div>
            <Avatar
              alt="Remy Sharp"
              src={props.data.photoURL}
              onClick={handleClick}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        );
    }
  };
  return userIcon();
}

export default UserIcon;
