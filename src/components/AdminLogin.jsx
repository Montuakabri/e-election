import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
// Import secure storage library (e.g., localforage)
import secureStore from "localforage";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BlockIcon from "@mui/icons-material/Block";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://13.127.211.205:8000/v1/login/admin",
        {
          name: username,
          password,
        }
      );

      if (response.status === 200) {
        // Store user role securely (e.g., using secureStore)
        await secureStore.setItem("user_role", "admin");

        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 1000,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Login Successfully",
        });

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 600);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserRole = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    if (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
  }, [error]);

  return (
    <div className="container">
      <div className="container">
        <div className="row">
          <div className="left-side col-6 d-flex justify-content-center align-items-center">
            <h1>E-Voting</h1>
          </div>
          <div className="right-side col-6">
            <div
              className=" d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <BlockIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Admin Sign in
                  </Typography>
                  <div>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="name"
                      name="name"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      inputRef={password}
                      label="Password"
                      type="password"
                      id="password"
                    />
                    <Button
                      onClick={handleSubmit}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={handleUserRole}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      User Login
                    </Button>
                  </div>
                </Box>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
