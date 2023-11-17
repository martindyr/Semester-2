import { getLotDetails } from "./service/auctionListing.js";

import { placeBid } from "./service/auctionListing.js";

import { countdown } from "./components/countdown.js";

import { formatDate } from "./components/formatDate.js";

const titleField = document.querySelector("#lot-title");
const countdownContainer = document.querySelector("#countdown-container");
const carouselField = document.querySelector(".carousel-inner");
const descriptionField = document.querySelector("#lot-description");
const biddingHeader = document.querySelector("#bid-container h4");
const biddingContainer = document.querySelector("#bid-container");
const bidBtn = document.querySelector("#bid-container button");
const invalidFeedback = document.querySelector(".invalid-feedback");
const sellerInformation = document.querySelector("#seller-information");
const lotInformation = document.querySelector("#lot-information");

// Getting the ID from the querystring
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const lot = await getLotDetails(id);
async function generateLotDetails() {
  const lot = await getLotDetails(id);
  /* Title */
  if (lot.title) {
    titleField.innerHTML = `
    ${lot.title}
    `;
  } else {
    titleField.innerHTML = `
    This lot has no title
    `;
  }

  /* Carousel */
  if (lot.media.length > 0) {
    for (let i = 0; i < lot.media.length; i++) {
      const activeClass = i === 0 ? "active" : "";
      carouselField.innerHTML += `
      <div class="carousel-item ${activeClass}">
      <img src="${lot.media[i]}" style="max-height: 600px; object-fit: cover" class="d-block w-100" alt="">
      </div>
      `;
    }
  } else {
    carouselField.innerHTML += `
    <div class="carousel-item active">
    <img style="height: auto; width: auto;" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" class="d-block alt="">
    </div>
    `;
  }

  /* Description */
  descriptionField.innerHTML = `
  <h5 class="fw-bold">Description</h5 class="fw-bold">
  <p>${lot.description ? lot.description : "This lot have no description"}</p>
  
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
        ? `<h3>${lot.bids.slice(-1)[0].amount} Credits</h3>`
        : "<h3>No bids</h3>"
    }
    `;
  }

  /* Lot information */
  sellerInformation.innerHTML = `
  <h5 class="fw-bold">Seller name</h5>
  <p>${lot.seller.name}</p>
  <h5 class="fw-bold">Seller email</h5>
  <p>${lot.seller.email}</p>
  `;

  /* Lot information */
  lotInformation.innerHTML = `
    <h5 class="fw-bold">Created</h5>
    <p>${formatDate(lot.created)}</p>
    <h5 class="fw-bold">Updated</h5>
    <p>${formatDate(lot.updated)}</p>
    `;
}
bidBtn.addEventListener("click", async function () {
  const bidAmount = document.querySelector("#bid-amount").value;
  const lotId = lot.id;
  if (bidAmount) {
    await placeBid(lotId, bidAmount);
    invalidFeedback.style.display = "none";
    generateLotDetails();
  } else {
    invalidFeedback.style.display = "block";
  }
});

/* countdown */
function generateCountdown() {
  countdownContainer.innerHTML = `
  <h5 class="fw-bold">Ends in</h5>
  <h4>${countdown(lot.endsAt).innerHTML}</h4>
  
  `;
}

const originalDate = new Date(lot.created);
const formatedDate = new Intl.DateTimeFormat("en-GB").format(originalDate);

function generateLotCountDown() {}

generateLotCountDown();
setInterval(generateCountdown, 1000);
generateCountdown();
generateLotDetails();
