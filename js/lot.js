import { getLotDetails } from "./service/auctionListing.js";

import { placeBid } from "./service/auctionListing.js";

const titleField = document.querySelector("#lot-title");
const carouselField = document.querySelector(".carousel-inner");
const descriptionField = document.querySelector("#lot-description");
const biddingHeader = document.querySelector("#lot-bidding h4");
const biddingContainer = document.querySelector("#bid-container");
const bidBtn = document.querySelector("#lot-bidding button");
const invalidFeedback = document.querySelector(".invalid-feedback");

// Getting the ID from the querystring
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const lot = await getLotDetails(id);
async function generateLotDetails() {
  const lot = await getLotDetails(id);
  /* Title */
  titleField.innerHTML = `
    ${lot.title}
    `;
  /* Carousel */
  for (let i = 0; i < lot.media.length; i++) {
    const activeClass = i === 0 ? "active" : "";
    carouselField.innerHTML += `
    <div class="carousel-item ${activeClass}">
      <img src="${lot.media[i]}" class="d-block w-100" alt="">
    </div>
    `;
  }
  /* Description */
  descriptionField.innerHTML = `
  ${lot.description}
  `;

  /* Bidding */
  const currentDate = new Date();
  const givenDate = new Date(lot.endsAt);
  if (givenDate < currentDate) {
    biddingContainer.innerHTML = `<h4>This lot has expired</h4>`;
  } else {
    biddingHeader.innerHTML = `
    ${
      lot.bids && lot.bids.length > 0
        ? `${lot.bids.slice(-1)[0].amount} by ${
            lot.bids.slice(-1)[0].bidderName
          }`
        : "no bids"
    }
    `;
  }
}
bidBtn.addEventListener("click", async function () {
  const bidAmount = document.querySelector("#bid-amount").value;
  const lotId = lot.id;
  if (bidAmount && bidAmount > lot.bids.slice(-1)[0].amount) {
    await placeBid(lotId, bidAmount);
    generateLotDetails();
  } else {
    invalidFeedback.style.display = "block";
  }
});

generateLotDetails();
