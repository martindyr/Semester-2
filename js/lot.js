import {
  getLotDetails
} from "./service/auctionListing.js";

import {
  placeBid
} from "./service/auctionListing.js";

import {
  countdown
} from './components/countdown.js'

import {
  formatDate
} from './components/formatDate.js'

const titleField = document.querySelector("#lot-title");
const carouselField = document.querySelector(".carousel-inner");
const descriptionField = document.querySelector("#lot-description");
const biddingHeader = document.querySelector("#lot-bidding h4");
const biddingContainer = document.querySelector("#bid-container");
const bidBtn = document.querySelector("#lot-bidding button");
const invalidFeedback = document.querySelector(".invalid-feedback");
const sellerInformation = document.querySelector('#seller-information')
const lotInformation = document.querySelector('#lot-information')

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
    `
  }

  /* Carousel */
  if (lot.media.length > 0) {
    for (let i = 0; i < lot.media.length; i++) {
      const activeClass = i === 0 ? "active" : "";
      carouselField.innerHTML += `
      <div class="carousel-item ${activeClass}">
      <img src="${lot.media[i]}" class="d-block w-100" alt="">
      </div>
      `;
    }
  } else {
    carouselField.innerHTML += `
    <div class="carousel-item active">
    <img style="height: auto; width: auto;" src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" class="d-block alt="">
    </div>
    `
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

  /* Lot information */
  sellerInformation.innerHTML = `
  <h5>Seller information</h5>
  <p>Created by: ${lot.seller.name}</p>
  <p>Email: ${lot.seller.email}</p>
  <p></p>
  `


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

const originalDate = new Date(lot.created);
const formatedDate = new Intl.DateTimeFormat('en-GB').format(originalDate);

function generateLotCountDown() {
  /* Lot information */
  console.log('running')
  lotInformation.innerHTML = `
  <h5>Lot information</h5>
  <p>Created on: ${formatDate(lot.created)}</p>
  <p>Ends on: ${formatDate(lot.endsAt)}</p>
  <p>Ends in: ${countdown(lot.endsAt).innerHTML}</p>
  `
}

generateLotCountDown()
setInterval(generateLotCountDown, 1000)
generateLotDetails();