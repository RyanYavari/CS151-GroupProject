import * as React from "react";
import { ReactDOM } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useRef } from "react";
import TextField from "@mui/material/TextField";
import { Button, Hidden } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import background from "./media/background.jpg";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [authError, showError] = useState(false);
  const[errorMessage, setMessage] = useState("");

  function createNewUser() {
    // console.log(firstName.current.value);
    // console.log(lastName.current.value);
    // console.log(email.current.value);
    // console.log(password.current.value);
    fetch(
      "http://localhost:8080/checkValidUser?firstName=" +
        firstName.current.value +
        "&lastName=" +
        lastName.current.value +
        "&email=" +
        email.current.value +
        "&password=" +
        password.current.value
    )
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        if (text === "New user created!") {
          fetch("http://localhost:8080/getUser")
            .then((response) => response.json())
            .then((result) => {
              navigate("/home", {state: {
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                handles: result.handles 
              }});
            });
        } else {
          showError(authError => true);
          setMessage(text);
        }
      });
  }

  return (
      <Box
        component="form"
        sx={{
          width: "100%",
          height: "100vh",
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundHeight: "100vh",
          backgroundSize: "cover",
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <List
            sx={{
              mx: "auto",
              width: 400,
              mt: 15,
              mb: 10,
              height: "65%",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "grey.50",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "grey.800" : "grey.300",
              borderRadius: 2,
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "700",
            }}
          >
            <ListItem
              sx={{
                mx: "auto",
                width: 300,
                mt: 1.5,
                justifyContent: "center",
                textAlign: "center",
                fontSize: "1.875rem",
                fontWeight: "700",
              }}
            >
              <label>DataScraper</label>
            </ListItem>
            <ListItem
              sx={{
                mx: "auto",
                width: 300,
              }}
            >
              <TextField
                sx={{
                  bgcolor: (theme) =>
                  theme.palette.mode === "#101010",
                  width: 300,
                }}
                id="firstNameInput"
                label="First Name"
                inputRef={firstName}
                required
              />
            </ListItem>
            <ListItem
              sx={{
                mx: "auto",
                width: 300,
              }}
            >
              <TextField
                sx={{
                  bgcolor: (theme) =>
                  theme.palette.mode === "#101010",
                  width: 300,
                }}
                id="lastNameInput"
                label="Last Name"
                inputRef={lastName}
                required
              />
            </ListItem>
            <ListItem
              sx={{
                mx: "auto",
                width: 300,
              }}
            >
              <TextField
                sx={{
                  bgcolor: (theme) =>
                  theme.palette.mode === "#101010",
                  width: 300,
                }}
                id="emailInput"
                label="Email"
                autoComplete="current-email"
                inputRef={email}
                required
              />
            </ListItem>
            <ListItem
              sx={{
                mx: "auto",
                width: 300,
              }}
            >
              <TextField
                sx={{
                  bgcolor: (theme) =>
                  theme.palette.mode === "#101010",
                  width: 300,
                }}
                id="passwordInput"
                label="Password"
                type="password"
                autoComplete="current-password"
                inputRef={password}
                required
                error={authError}
                helperText={errorMessage}
              />
            </ListItem>
            <ListItem
              sx={{
                mx: "auto",
                width: 300,
              }}
            >
              <Button
                variant="outlined"
                onClick={createNewUser}
                sx={{
                  bgcolor: (theme) =>
                  theme.palette.mode === "#101010",
                  mx: "auto",
                  width: 105,
                }}
              >
                Signup
              </Button>
            </ListItem>
            <ListItem
              sx={{
                mx: "auto",
                width: 300,
                justifyContent: "center",
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "350",
              }}
            >
              <label>
                Have an account? <Link to="/">Log in</Link>!
              </label>
            </ListItem>
          </List>
        </div>
      </Box>
  );
}
