import { renderAuthForm, fetchMe } from "./auth.js";
//import {  } from "./posts.js";

const authForm = $("#auth_form");

window.auth_state = {
  currentUserObj: null,
  currentUser: localStorage.getItem("currentUser"),
  currentForm: "login",
  authError: null,
};

function isLoggedIn() {
  const token = localStorage.getItem("token");

  if (token === null) return false;

  return token;
}

//fetchMe();

export function appendAuthForm() {
  authForm.empty();
  authForm.append(renderAuthForm());
}

appendAuthForm();

if (isLoggedIn()) {
  //hit the /me route and store the response in state
  fetchMe(localStorage.getItem("token"))
    .then((userObj) => {
      window.auth_state.currentUserObj = userObj;
      window.auth_state.currentUser = userObj.username;
      window.auth_state.currentForm = "logout";
      appendAuthForm();
    })
    .catch(console.error);
}
