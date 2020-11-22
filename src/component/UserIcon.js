import Login from "./Login"
import { StyledFirebaseAuth } from "react-firebaseui";
import React, { useEffect } from "react";
import { Button, Avatar, Menu, MenuItem, Modal, makeStyles } from "@material-ui/core";
import Axios from "axios";
import firebase from "firebase";
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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function UserIcon(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const handleModalOpen = () => {
    setOpen(true);
    console.log(props.data)
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  };
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  const body = (
      <div style={modalStyle} className={classes.paper}>
        <Login
          Email={props.Email}
          setEmail={props.setEmail}
          Password={props.Password}
          setPassword={props.setPassword}
          handlelogin={props.handlelogin}
          handleSignup={props.handleSignup}
          hasAccount={props.hasAccount}
          setHasAccount={props.setHasAccount}
          emailError={props.emailError}
          setEmailError={props.setEmailError}
          passwordError={props.passwordError}
          setpasswordError={props.setpasswordError}
        />
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <Button color="primary" onClick={handleModalClose}>Close</Button>
      </div>
  );
  const userIcon = () => {
    switch (props.data) {
      case null:
        return <div>loading...</div>;
      case false:
        return (<div>
          <Button
            color="inherit"
            onClick={() => {
              handleModalOpen();
            }}
          >
            Login
          </Button>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        </div>
        );
      default:
        return (
          <div>
            <Avatar alt="Remy Sharp" src={props.data.photoURL} onClick={handleClick} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        );
    }
  };
  return userIcon();
}

export default UserIcon;
