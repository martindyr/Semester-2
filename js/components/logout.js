import { removeItemFromStore } from "../storage.js";

const logoutBtn = document.querySelector("#logout-btn");

function logout() {
  removeItemFromStore();
}

logoutBtn.addEventListener("click", logout);
