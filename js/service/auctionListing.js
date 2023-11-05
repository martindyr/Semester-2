import {
  getToken
} from "../storage.js";
import {
  notification
} from "../components/notification.js";


export async function getListings(body) {
  const url = "https://api.noroff.dev/api/v1/auction/listings";
  /* const body = {}; */
  try {
    const repsonse = await fetch(url + "?" + new URLSearchParams(body));
    const json = await repsonse.json();
    console.log('Number of listings: ', json);
    return json;
  } catch (error) {
    console.log("We done goufe:", error);
  }
}

export async function createListing(lot) {
  const url = "https://api.noroff.dev/api/v1/auction/listings";
  const body = JSON.stringify(lot);
  const options = {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
  };
  try {
    const repsonse = await fetch(url, options);
    const json = await repsonse.json();

    if (json.id) {
      notification('success', `You have posted lot: ${json.title}`)
    }
    console.log(json);

  } catch (error) {
    console.log("Something went wrong when creating listing", error);
  }
}