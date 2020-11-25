import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";

function Logout(props) {
  const {handleLogout} = props
  const hello = (value) => {
      console.log(value);
  }
   
  return (
    <div>
        <Button variant="primary"  onClick={handleLogout}>
          Logout
        </Button>
        

    </div>
  );
}

export default Logout;
