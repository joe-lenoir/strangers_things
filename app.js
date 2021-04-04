import { renderAuthForm } from "./auth.js";
//import {  } from "./posts.js";

const authForm = $("#auth_form");

window.auth_state = {
  currentUser: localStorage.getItem("currentUser"),
  currentForm: "login",
  authError: null
};

export function appendAuthForm() {
  authForm.empty();
  authForm.append(renderAuthForm());
}

appendAuthForm()






