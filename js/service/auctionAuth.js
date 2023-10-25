import { saveToken } from "../storage.js";
/* Login request */
export async function login() {
  console.log("Running login...");
  const emailField = document.querySelector("#loginEmail");
  const passwordField = document.querySelector("#loginPassword");

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
      console.log("Logged in, and token stored");
    }

    if (json.error) {
      alert("Login credentials is wrong.");
    }
  } catch (error) {
    console.log("Something went wrong with the login:", error);
  }
}

/* Register request */

export async function register() {
  console.log("Running registration...");
  const url = "https://api.noroff.dev/api/v1/auction/auth/register";
  const data = JSON.stringify({
    name: "martindyrset",
    email: "mardyr2@stud.noroff.no",
    avatar: "",
    password: "1234567890",
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
    console.log("Registered: ", json);
  } catch (error) {
    console.log("Error with the registration:", error);
  }
}
