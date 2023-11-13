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

export async function getLotDetails(id) {
  const url = `https://api.noroff.dev/api/v1/auction/listings/${id}`;
  try {
    const repsonse = await fetch(url);
    const json = await repsonse.json();
    console.log("Lot Details: ", json);
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

export async function deleteLot(id) {
  const url = `https://api.noroff.dev/api/v1/auction/listings/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };
  try {
    const response = await fetch(url, options);

    console.log(response);
    if (response.status === 204) {
      notification("success", "Lot has been deleted");
    }
  } catch (error) {
    notification("error", "There was a error deleting this Lot");
  }
}

// This function will handle the PUT request for updating an object
export async function updateLot(id, requestData) {
  const backDropModal = document.querySelector(".modal-backdrop");
  const updateModal = document.querySelector("#update-lot-modal");
  const url = `https://api.noroff.dev/api/v1/auction/listings/${id}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(requestData),
  };

  try {
    const response = await fetch(url, options);
    const updatedObject = await response.json();
    if (updatedObject.id) {
      updateModal.style.display = "none";
      backDropModal.style.display = "none";
      notification("success", "You have updated your Lot");
      return updatedObject; // Return the updated lot if needed
    }
  } catch (error) {
    console.error("Error updating lot:", error);
  }
}
