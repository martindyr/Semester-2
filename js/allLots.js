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
    lotContainer.innerHTML += `
    <p>title: ${lotList[i].title}</p>`;
  }
}

submit();
