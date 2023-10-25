import { login } from "../service/auctionAuth.js";

const loginBtn = document.querySelector("#login-btn");
loginBtn.addEventListener("click", login);
