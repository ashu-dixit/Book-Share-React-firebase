import React, { useEffect } from "react";

export default function ButtonAppBar(props) {
  useEffect(() => {
    console.log(props.User.displayName);
  }, []);
  const ProfileData = () => {
    switch (props.User) {
      case null:
        return "Loading....";
      case false:
        return "Login first";
      default:
        return (
          <div>
            {" "}
            Name: {props.User.displayName}
            <br />
            Email: {props.User.displayName}
            <br />
            Phone: {props.User.phoneNumber?props.User.phoneNumber:"NA"}
            <br/>
            Profile Picture: <br/><img src={props.User.photoURL}/>
          </div>
        );
    }
  };

  return ProfileData();
}
