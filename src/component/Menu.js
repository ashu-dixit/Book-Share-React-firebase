import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const HomeOnClick = useCallback(() => history.push("/"), [history]);
  const UploadOnClick = useCallback(() => history.push("/upload"), [history]);
  const ProfileOnClick = useCallback(() => history.push("/profile"), [history]);
  const FavoriteOnClick = useCallback(() => history.push("/post"), [history]);

  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      className={classes.root}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="Value"
        icon={<HomeIcon />}
        onClick={HomeOnClick}
      />
        <BottomNavigationAction
          label="Post"
          value="post"
          icon={<AssignmentOutlinedIcon />}
          onClick={FavoriteOnClick}
        />
      <BottomNavigationAction
        label="Upload"
        value="upload"
        icon={<AddCircleOutlineIcon/>}
        onClick={UploadOnClick}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonIcon />}
        onClick={ProfileOnClick}
      />
    </BottomNavigation>
  );
}