import { Button } from "@mui/material";
import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const [user, setUser] = useState("");
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        handleLogout();
      } else {
        setUser(user);
      }
    } else {
      handleLogout();
    }
  }, []);

  return (
    <div>
      <h2>Welcome back, {user.name} </h2>
      <Button color="success" variant="contained" onClick={handleLogout} style={{ margin: "20px auto", display: "block" }}>
        LOGOUT
      </Button>
    </div>
  );
};

export default Homepage;
