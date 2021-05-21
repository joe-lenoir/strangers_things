import { appendAuthForm } from "./app.js";

const form = $("#create-account");

function isLoggedIn() {
  const token = localStorage.getItem("token");

  if (token === null) return false;

  return token;
}

export function renderAuthForm() {
  if (isLoggedIn()) {
    return renderLogoutButton();
  }
  return renderToggleForm();
}

function renderLogoutButton() {
  const logoutButton = $(`
    <div>
    <h2>welcome ${window.auth_state.currentUser}</h2>
    <button id="logout">logout</button>
    </div>
  `);

  logoutButton.click(function () {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    appendAuthForm();
  });

  return logoutButton;
}

function registerUser(username, password) {
  return fetch(
    "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    }
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        window.auth_state.authError = result.error.message;
        return;
      }
      const token = result.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", username);
      window.auth_state.currentUser = username;

      return result;
    })
    .catch(console.error);
}

function loginUser(username, password) {
  return fetch(
    'https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/login',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    }
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
          window.auth_state.authError = result.error.message;
          return;
      }
      const token = result.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", username);
      window.auth_state.currentUser = username;
      
      return result;
    })
    .catch(console.error);
}

export async function fetchMe(token) {
  try {
    const response = await fetch(
      "https://strangers-things.herokuapp.com/api/2101-VPI-RM-WEB-PT/users/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const parsedJson = await response.json();
    return parsedJson.data;
  } catch (error) {
    console.error(error);
  }
}

const authHeadlines = {
  login: "Sign in:",
  register: "Sign up:"
};

const authBylines = {
  login: "Don't have an account yet? sign up HERE.",
  register: "Already have an account? sign in HERE."
};

const authFns = {
  login: loginUser,
  register: registerUser,
};

function renderToggleForm() {
  const currentForm = window.auth_state.currentForm;
  const authError = window.auth_state.authError;
  const heading = authHeadlines[currentForm];
  const bylineText = authBylines[currentForm];
  const form = $(`
    <form id="toggle_form">
      <h2>${heading}</h2>
      <input type="text" id="username" placeholder="username"></input>
      <input type="password" id="password" placeholder="password"</input>
      <button>Submit</button>
      <div id="toggle_link"></div>
    </form>
  `);

  const errorContainer = form.find("#error_container");
  errorContainer.append(authError ? authError : "");

  const toggleLink = form.find("#toggle_link");
  toggleLink.append(bylineText);

  toggleLink.click(function (event){
  window.auth_state.currentForm = 
      (currentForm === "login" ? "register" : "login");
  window.auth_state.authError = null;
  appendAuthForm();
});

form.submit(function (event) {
  event.preventDefault();
  const uname = form.find("#username").val();
  const pword = form.find("#password").val();

  authFns[currentForm](uname, pword)
    .then(() => {
      console.log("logged in");
      appendAuthForm();
    })
    .catch((error) => {
      console.error(error);
    });
});

  return form;
}

