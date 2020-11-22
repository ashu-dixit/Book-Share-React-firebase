import React, { useEffect } from "react";
import "./App.css";
import fire from "./firebase";
import firebase from "firebase";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "./component/Menu";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import MyBooks from "./component/MyBooks";
import UploadBooks from "./component/UploadBooks";
import Home from "./component/Home";
import Profile from "./component/Profile";
import UserIcon from "./component/UserIcon";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  active_class: {
    color: "green",
    textDecorationLine: "none",
  },

}));

function App() {
  const [User, setUser] = React.useState(false);
  const [Email, setEmail] = React.useState();
  const [Password, setPassword] = React.useState();
  const [emailError, setEmailError] = React.useState();
  const [passwordError, setpasswordError] = React.useState();
  const [hasAccount, setHasAccount] = React.useState();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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
  const handleLogout = () => {
    fire.auth().signOut();
    setUser(false);
  };
  const authListner = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearError();
        setUser(user);
      }
    });
  };
  useEffect(() => {
    authListner();
    console.log(User.uid); 
  }, []);
  return (
    <div>
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap className={classes.title}>
                Book Share
              </Typography>
              <UserIcon
                data={User}
                handlelogin={handlelogin}
                handleLogout={handleLogout}
                Email={Email}
                setEmail={setEmail}
                Password={Password}
                setPassword={setPassword}
                handlelogin={handlelogin}
                handleSignup={handleSignup}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                setEmailError={setEmailError}
                passwordError={passwordError}
                setpasswordError={setpasswordError}
              />
            </Toolbar>
          </AppBar>
          <Menu handleDrawerClose={handleDrawerClose} open={open} />
          <main className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/profile" component={() => <Profile User={User}/>} />
              <Route exact path="/mybooks" component={() => <MyBooks id={User.uid}/>}/>
              <Route exact path="/" component={Home} />
              <Route exact path="/upload" component={() => <UploadBooks id={User.uid}/>}/>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
