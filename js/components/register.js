import { register } from "../service/auctionAuth.js";
const form = document.querySelector("#register-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let validFields = 0;

  // Validate email
  const email = document.querySelector("#register-email");
  const emailFeedback = document.querySelector("#email-feedback");
  if (validateEmail(email.value)) {
    emailFeedback.style.display = "none";
    validFields++;
  } else {
    emailFeedback.style.display = "block";
  }

  // Validate Password
  const password = document.querySelector("#register-password");
  const passwordFeedback = document.querySelector("#password-feedback");
  if (password.value.length >= 8) {
    passwordFeedback.style.display = "none";
    validFields++;
  } else {
    passwordFeedback.style.display = "block";
  }

  // Validate Name
  const name = document.querySelector("#register-name");
  const nameFeedback = document.querySelector("#name-feedback");
  if (validateName(name.value)) {
    nameFeedback.style.display = "none";
    validFields++;
  } else {
    nameFeedback.style.display = "block";
  }
  // If all fields are valid, register user
  if (validFields === 3) {
    register();
  }
});

function validateEmail(email) {
  const regex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  const patternMatches = regex.test(email);
  return patternMatches;
}

function validateName(name) {
  const regex = /^[\w]+$/;
  const patternMatches = regex.test(name);
  return patternMatches;
}
