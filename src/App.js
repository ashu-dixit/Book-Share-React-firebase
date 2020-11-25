import React, { useEffect } from "react";
import "./App.css";
import fire from "./firebase";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "./component/Menu";
import Notification from "@material-ui/icons/Notifications";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import MyBooks from "./component/MyBooks";
import UploadBooks from "./component/UploadBooks";
import Home from "./component/Home";
import Profile from "./component/Profile";
import UserIcon from "./component/UserIcon";
import { useAuthState } from "react-firebase-hooks/auth";
import Post from "./component/Post";
import { Col, Row } from "react-bootstrap";
import { Favorite, Folder, LocationOn, Restore } from "@material-ui/icons";
import { Badge, fade, InputBase } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from '@material-ui/icons/Search';
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
    // transition: theme.transitions.create("margin", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    // marginLeft: -drawerWidth,
  },
  // contentShift: {
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: 0,
  // },
  active_class: {
    color: "green",
    textDecorationLine: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    // width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function App() {
  const [User] = useAuthState(fire.auth());
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);
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
              <Typography variant="h6" noWrap className={classes.title}>
                Pustak.com
              </Typography>
              {/* <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div> */}
              {User ? (
                <>
                  <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </>
              ) : (
                <></>
              )}

              <UserIcon data={User} />
            </Toolbar>
          </AppBar>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/mybooks" component={() => <MyBooks />} />
              <Route exact path="/" component={Home} />
              <Route exact path="/upload" component={UploadBooks} />
              <Route exact path="/post" component={Post} />
            </Switch>
          </main>
          {/* <Container style={{position:'fixed', bottom:0, height}}>
            <Row>
              <Col>
                <Restore />
              </Col>
              <Col>
                <Favorite />
              </Col>
              <Col>
                <LocationOn />
              </Col>
              <Col>
                <Folder />
              </Col>
            </Row>
          </Container> */}
          <Menu handleDrawerClose={handleDrawerClose} open={open} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
