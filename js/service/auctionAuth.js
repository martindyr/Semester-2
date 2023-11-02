import { saveToken } from "../storage.js";
import { notification } from "../components/notification.js";
/* Login request */
export async function login() {
  console.log("Running login...");
  const emailField = document.querySelector("#login-email");
  const passwordField = document.querySelector("#login-password");

  const email = emailField.value.trim();
  const password = passwordField.value.trim();

  console.log("login: ", email, password);
  const url = "https://api.noroff.dev/api/v1/auction/auth/login";
  const data = JSON.stringify({
    email,
    password,
  });
  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const repsonse = await fetch(url, options);
    const json = await repsonse.json();
    console.log(json);

    if (json.accessToken) {
      saveToken(json.accessToken);
      notification("success", "Successfully Logged in");
    }

    if (json.errors) {
      notification("error", `${json.errors[0].message}`);
    }
  } catch (error) {
    console.log("Something went wrong with the login:", error);
  }
}

/* Register request */

export async function register() {
  console.log("Running registration...");
  const emailField = document.querySelector("#register-email");
  const passwordField = document.querySelector("#register-password");
  const nameField = document.querySelector("#register-name");
  const avatarField = document.querySelector("#register-avatar");

  const email = emailField.value.trim();
  const password = passwordField.value.trim();
  const name = nameField.value.trim();
  const avatar = avatarField.value;
  const url = "https://api.noroff.dev/api/v1/auction/auth/register";
  const data = JSON.stringify({
    name,
    email,
    avatar,
    password,
  });
  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const repsonse = await fetch(url, options);
    const json = await repsonse.json();
    if (json.id) {
      notification("success", "Registration complete");
      console.log("Registered: ", json);
    } else {
      notification("error", "Registration failed, user exists");
    }
  } catch (error) {
    console.log("Error with the registration:", error);
  }
}
