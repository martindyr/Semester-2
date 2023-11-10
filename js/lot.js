import { getLotDetails } from "./service/auctionListing.js";

const container = document.querySelector(".dobdob");

// Getting the ID from the querystring
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function generateLotDetails() {
  const lot = await getLotDetails(id);
  container.innerHTML = `
    Title: ${lot.title}
    `;
}
generateLotDetails();
