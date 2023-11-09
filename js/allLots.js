import { getLots } from "./service/auctionListing.js";
import { countdown } from "./components/countdown.js";

const submitFilter = document.querySelector("#submit-filter");
const showInactive = document.querySelector("#filter-show-inactive");
const limit = document.querySelector("#filter-limit");
const sort = document.querySelector("#filter-sort");
const sortOrder = document.querySelector("#filter-sort-order");

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
  console.log("Current filter:", filter);
  const filteredLotList = await getLots(filter);
  generateList(filteredLotList);
}

submitFilter.addEventListener("click", submit);

function generateList(lotList) {
  lotContainer.innerHTML = "";
  for (let i = 0; i < lotList.length; i++) {
    const countdownElement = countdown(lotList[i].endsAt);
    /* TODO set max height on images below */
    lotContainer.innerHTML += `
  <div class="col">
    <div class="card h-100">
     <img src="${lotList[i].media[0]}" class="card-img-top" alt="Missing Image...">
     <div class="card-body">
       <h5 class="card-title">${lotList[i].title}</h5>
       <p class="card-text">${lotList[i].description}</p>
     </div>
     <div class="card-footer">
       <small class="text-muted">${countdownElement.innerHTML}</small>
     </div>
    </div>
  </div>
    `;
  }
}
/* HACK to refresh timer */
const intervalId = setInterval(submit, 5000);
submit();
