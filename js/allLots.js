import { getListings } from "./service/auctionListing.js";

const lotContainer = document.querySelector("#lot-list");
const lotList = await getListings();
console.log(lotList);

function generateList() {
  for (let i = 0; i < lotList.length; i++) {
    lotContainer.innerHTML += `
    <p>title: ${lotList[i].title}</p>`;
  }
}
generateList();
