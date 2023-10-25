import { saveToken, saveUser } from "./storage.js";

console.log("initiated");
// Target HTML
const form = document.querySelector("form");
const loginBtn = document.querySelector(".loginBtn");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector(".error");

// Login function
form.onsubmit = function () {
  event.preventDefault();

  errorMessage.style.display = "none";

  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  if (!usernameValue.length || !passwordValue.length) {
    return (errorMessage.style.display = "block");
  }

  login(usernameValue, passwordValue);
};

async function login(username, password) {
  const url = "http://localhost:1337/api/auth/local";
  console.log(url);
  const data = JSON.stringify({ identifier: username, password: password });
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

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);
      location.href = "/welcomPage.html";
    }

    if (json.error) {
      alert("Login credentials is wrong.");
    }
  } catch (error) {
    console.log("We done goufe:", error);
  }
}
