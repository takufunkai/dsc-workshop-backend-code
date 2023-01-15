import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { auth } from "/lib/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import useAuthStore from "../lib/store/authStore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

function signInPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    rekeyPassword:"",
  });

  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const handleSubmit = () => {
    const credential = EmailAuthProvider.credential(data.email, data.oldPassword)

    if (!user) {
      alert("User not signed in")
      return
    }

    reauthenticateWithCredential(user, credential).then(() => {
      /**
  	   * FIREBASE AUTHENTICATION EXERCISE
  	   * TODO: Complete this function by resetting the user's password here.
  	   * Documentation: https://firebase.google.com/docs/auth/web/manage-users
  	   */
      // Insert solution here
    }).catch(error => {
      console.log(error)
      alert("User credentials incorrect")
    })

  };

  const directToDashboard = () => {
    router.push("/dashboard");
    return <div>Loading... </div>;
  };

  return (
    <div>
      <div className="" align="center">
        <h1 align="center">Reset your password</h1>
        <br />

        <Box
          align="center"
          sx={{
            width: 300,
            height: 375,
            align: "right",
            backgroundColor: "#eeeee4",
            p: 2,
            borderRadius: "16px",
          }}
        >
          <TextField
            id="filled-basic"
            variant="filled"
            borederColor="red"
            label="Email"
            name="email"
            type="email"
            onChange={(event) => handleInputs(event)}
          />
          <br />
          <br />
          <TextField
            id="filled-basic"
            variant="filled"
            label="Old Password"
            name="oldPassword"
            type="password"
            onChange={(event) => handleInputs(event)}
          />
          <br />
          <br />
          <TextField
            id="filled-basic"
            variant="filled"
            label="New Password"
            name="newPassword"
            type="password"
            onChange={(event) => handleInputs(event)}
          />
          <br/>
          <br/>
          <TextField
            id="filled-basic"
            variant="filled"
            label="Re-key Password"
            name="rekeyPassword"
            type="password"
            onChange={(event) => handleInputs(event)}
          />
          <br/>
          <br/>
          <Button variant="outlined" onClick={handleSubmit}>
            Reset Password
          </Button>
          <br />
          <br />
        </Box>
      </div>
    </div>
  );
}

export default signInPage;
