let activeDiv = null;
export const setDiv = (newDiv) => {
  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export let message = null;

import { showTaskTracker, handleTaskTracker } from "../script/task-tracker.js";
import { handleAddEdit } from "../script/addEditTaskTracker.js";
import { showLogin, handleLogin } from "../script/login.js";
import { filterTasks } from "../script/filter.js";
import { handleRegister } from "../script/register.js";

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

document.getElementById('logout').addEventListener("click", (e) => {
    setToken(null);
    message.textContent = "You have been logged off.";
    showLogin();
});




document.addEventListener("DOMContentLoaded", () => {
    token = localStorage.getItem("token");
    message = document.getElementById("message");
    handleLogin();
    handleTaskTracker();
    handleRegister();
    handleAddEdit();
    filterTasks();

    if (token) {
        showTaskTracker();
      } else {
        showLogin();
      }
    
  });