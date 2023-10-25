import { register } from "../service/auctionAuth.js";

const registerBtn = document.querySelector("#registerBtn");
registerBtn.addEventListener("click", register);
