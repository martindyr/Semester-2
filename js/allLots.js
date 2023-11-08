import { getLots } from "./service/auctionListing.js";

const submitFilter = document.querySelector("#submit-filter");
const showInactive = document.querySelector("#filter-show-inactive");
const limit = document.querySelector("#filter-limit");
const offset = document.querySelector("#filter-offset");
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
  if (offset.value) {
    Object.assign(filter, {
      offset: offset.value,
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
       <small class="text-muted">${lotList[i].endsAt}</small>
     </div>
    </div>
  </div>
    `;
  }
}

submit();
