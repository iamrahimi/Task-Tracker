// import { exists } from "../../models/User.js";
import {
    inputEnabled,
    setDiv,
    token,
    message,
    enableInput,
    setToken,
  } from "../js/script.js";
  import { showLoginRegister } from "./loginRegister.js";
import { showRegister } from "./register.js";
  import { showTaskTracker } from "./task-tracker.js";
  
  let loginDiv = null;
  let email = null;
  let password = null;
  
  export const handleLogin = () => {
    loginDiv = document.getElementById("login-register-box");
    email = document.getElementById("email-login");
    password = document.getElementById("password-login");
    const loginButton = document.getElementById("login-button");
    const registerButton = document.getElementById('register');
  
    loginDiv.addEventListener("click", async (e) => {
      if (inputEnabled && e.target.nodeName === "BUTTON") {
        if (e.target === loginButton) {
          enableInput(false);
          if(email.value == "" || password.value == "") 
          {
            document.getElementById('email-pwd-required-msg').style.display = "block";
          }
          try {
            const response = await fetch("/api/v1/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email.value,
                password: password.value,
              }),
            });
  
            const data = await response.json();
            if (response.status === 200) {
              message.textContent = `Login successful.  Welcome ${data.user.name}`;
              setToken(data.token);
  
              email.value = "";
              password.value = "";
              // document.getElementById('menubar').style.display = "block";
              showTaskTracker();
            } else {
              message.textContent = data.msg;
            }
          } catch (err) {
            console.error(err);
            message.textContent = "A communications error occurred.";
          }
  
          enableInput(true);

        } 
      }else if(e.target.nodeName === 'A') {
        if(e.target === registerButton){
          showRegister();
        }
      }
    });
  };
  
  export const showLogin = () => {
    email.value = null;
    password.value = null;
    // document.getElementById('menubar').style.display = "none";
    setDiv(loginDiv);
  };