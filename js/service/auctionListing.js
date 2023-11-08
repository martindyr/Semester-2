import { getToken } from "../storage.js";
import { notification } from "../components/notification.js";

export async function getLots(body) {
  const url = "https://api.noroff.dev/api/v1/auction/listings";
  try {
    const repsonse = await fetch(url + "?" + new URLSearchParams(body));
    const json = await repsonse.json();
    console.log("Number of listings: ", json);
    return json;
  } catch (error) {
    console.log("We done goufe:", error);
  }
}

export async function createLot(lot) {
  const backDropModal = document.querySelector(".modal-backdrop");
  const createModal = document.querySelector("#create-lot-modal");
  const url = "https://api.noroff.dev/api/v1/auction/listings";
  const body = JSON.stringify(lot);
  const options = {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };
  try {
    const repsonse = await fetch(url, options);
    const json = await repsonse.json();

    if (json.id) {
      notification("success", `You have posted lot: ${json.title}`);
      createModal.style.display = "none";
      backDropModal.style.display = "none";
    }
    console.log(json);
  } catch (error) {
    console.log("Something went wrong when creating listing", error);
  }
}
