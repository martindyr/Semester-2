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
  const placeholderImg =
    "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
  lotContainer.innerHTML = "";
  for (let i = 0; i < lotList.length; i++) {
    /* TODO Add this to skip lots that dont have img? */
    /*     if (lotList[i].media.length === 0) {
      continue;
    } */
    const countdownElement = countdown(lotList[i].endsAt);
    lotContainer.innerHTML += `
  <div class="col">
    <div class="card h-100">
     <img style="width: 100%; height: 200px; object-fit: cover;" src="${
       lotList[i].media[0] ? lotList[i].media[0] : placeholderImg
     }" class="card-img-top" alt="Missing Image...">
     <div style="padding-bottom: 0px !important" class="card-body d-flex flex-column justify-content-between">
       <div class="pb-4">
         <h5 class="card-title fw-bold">${
           lotList[i].title ? lotList[i].title : "No title"
         }</h5>
         <p style="overflow: hidden;
         display: -webkit-box;
         -webkit-line-clamp: 3;
         -webkit-box-orient: vertical;
         max-height: 70px;" class="card-text">${
           lotList[i].description ? lotList[i].description : "No description"
         }</p>
       </div>
       <div class="d-flex justify-content-between pb-2">
         <p style="margin-bottom: 0px !important; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" 
         class="card-text ellipsis">Current bid: ${
           lotList[i].bids && lotList[i].bids.length > 0
             ? `<span class="fw-bold">${lotList[i].bids.slice(-1)[0].amount} Credits</span>`
             : `<span class="fw-bold">No bids</span>`
         } </p>
         <a style="white-space: nowrap;" href="lot.html?id=${
           lotList[i].id
         }">See details</a>
       </div>
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
