import { removeItemFromStore } from "../storage.js";

const logoutBtn = document.querySelector("#logout-btn");

function logout() {
  window.location.href = '/index.html';
  removeItemFromStore();
}

logoutBtn.addEventListener("click", logout);
