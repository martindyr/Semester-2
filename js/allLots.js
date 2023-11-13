import { getLots } from "./service/auctionListing.js";
import { countdown } from "./components/countdown.js";
import { toggleUI } from "./components/toggleUserInterface.js";

const submitFilter = document.querySelector("#submit-filter");
const showInactive = document.querySelector("#filter-show-inactive");
const limit = document.querySelector("#filter-limit");
const sort = document.querySelector("#filter-sort");
const sortOrder = document.querySelector("#filter-sort-order");
const body = document.querySelector("body");

const lotContainer = document.querySelector("#lot-list");

const firstLoad = {};

async function submit() {
  const filter = {};

  if (showInactive.checked === true) {
    Object.assign(filter, {
      _active: showInactive.checked,
    });
  }
  if (limit.value) {
    Object.assign(filter, {
      limit: limit.value,
    });
  }
  if (sort.value) {
    Object.assign(filter, {
      sort: sort.value,
    });
  }
  if (sortOrder.value) {
    Object.assign(filter, {
      sortOrder: sortOrder.value,
    });
  }
  Object.assign(filter, {
    _seller: true,
  });
  Object.assign(filter, {
    _bids: true,
  });
  console.log("Current filter:", filter);
  const filteredLotList = await getLots(filter);
  generateList(filteredLotList);
}

submitFilter.addEventListener("click", submit);

function generateList(lotList) {
  lotContainer.innerHTML = "";
  for (let i = 0; i < lotList.length; i++) {
    /* TODO Add this to skip lots that dont have img? */
    /*     if (lotList[i].media.length === 0) {
      continue;
    } */
    const countdownElement = countdown(lotList[i].endsAt);
    /* TODO set max height on images below */
    lotContainer.innerHTML += `
  <div class="col">
    <div class="card h-100">
     <img src="${
       lotList[i].media[0]
         ? lotList[i].media[0]
         : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
     }" class="card-img-top" alt="Missing Image...">
     <div class="card-body">
       <h5 class="card-title">${lotList[i].title}</h5>
       <p class="card-text">${lotList[i].description}</p>
       <p class="card-text">Seller: ${lotList[i].seller.name}</p>
       <p class="card-text">Current bid: ${
         lotList[i].bids && lotList[i].bids.length > 0
           ? `${lotList[i].bids.slice(-1)[0].amount} by ${lotList[i].bids.slice(-1)[0].bidderName}`
           : "no bids"
       } </p>
       <a href="lot.html?id=${lotList[i].id}">See details</a>
     </div>
     <div class="card-footer">
       <small class="text-muted">${countdownElement.textContent}</small>
     </div>
    </div>
  </div>
    `;
  }
  toggleUI();
}
/* HACK to refresh timer */
setInterval(submit, 30000);
submit();
