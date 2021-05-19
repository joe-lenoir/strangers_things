import { renderAuthForm } from "./auth.js";
//import {  } from "./posts.js";

const authForm = $("#auth_form");

window.auth_state = {
  currentUserObj: null,
  currentUser: localStorage.getItem("currentUser"),
  currentForm: "login",
  authError: null
};

function isLoggedIn() {
  const token = localStorage.getItem("token");

  if (token === null) return false;

  return token;
}

async function fetchMe(token) {
 try {
   const response = await fetch(
     'https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
    const parsedJson = await response.json();
    return parsedJson.data
  } catch (error) {
    console.error(error);
  }

}

export function appendAuthForm() {
  authForm.empty();
  authForm.append(renderAuthForm());
}

appendAuthForm();

if (isLoggedIn()) {
  //hit the /me route and store the response in state
fetchMe(localStorage.getItem("token"))
  .then(userObj => {
      window.auth_state.currentUserObj = userObj;
  })
  .then(() => {
    console.log(window.auth_state)
  })
  .catch(console.error);
}








