import { getToken, removeItemFromStore } from "../storage.js";
// Check if the user is logged in by looking for the token in local storage
function userLoggedIn() {
  const token = getToken();
  if (token != undefined) {
    return token;
  }
}

console.log("function returns", userLoggedIn().length);

// Function to show/hide elements based on login status
export function toggleUI() {
  console.log("Toggeling UI");
  const loginElements = document.querySelectorAll(".logged-in");
  const logoutElements = document.querySelectorAll(".logged-out");

  if (userLoggedIn().length > 20) {
    console.log("User is logged in", userLoggedIn());
    loginElements.forEach((element) => {
      element.style.display = "block";
    });
    logoutElements.forEach((element) => {
      element.style.display = "none";
    });
  } else {
    console.log("User is not logged in", userLoggedIn());
    loginElements.forEach((element) => {
      element.style.display = "none";
    });
    logoutElements.forEach((element) => {
      element.style.display = "block";
    });
  }
}

// Add an event listener to handle logout
document.getElementById("logout-btn").addEventListener("click", function () {
  // Toggle the UI
  setTimeout(toggleUI, 500);
});

// Add an event listener to handle login
document.getElementById("login-btn").addEventListener("click", function () {
  // Toggle the UI
  setTimeout(toggleUI, 500);
});

// Call toggleUI when the page loads to initialize the UI
toggleUI();
