import { inputEnabled, setDiv } from "../js/script.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

let loginRegisterDiv = null;

export const handleLoginRegister = () => {
  loginRegisterDiv = document.getElementById("login-register");
  const login = document.getElementById("logon");
  const register = document.getElementById("register");

  loginRegisterDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === login) {
        showLogin();
      } else if (e.target === register) {
        showRegister();
      }
    }
  });
};

export const showLoginRegister = () => {
  setDiv(loginRegisterDiv);
};