import { getLots } from "./service/auctionListing.js";
import { toggleUI } from "./components/toggleUserInterface.js";
import { countdown } from "./components/countdown.js";

const carouselImgContainer = document.querySelector(".carousel-inner");
const lotList = await getLots({
  _active: true,
  sort: "title",
  sortORder: "asc",
  offset: 10,
});

function generateCarousel() {
  console.log("running");

  for (let i = 0; i < lotList.length; i++) {
    if (lotList[i].media.length === 0) {
      continue;
    } else {
      const activeClass = i === 0 ? "active" : "";
      carouselImgContainer.innerHTML += `
        <div class="carousel-item ${activeClass}">
          <img src="${lotList[i].media[0]}" style="max-height: 600px; object-fit: cover" class="d-block w-100"" alt="">
          <div class="carousel-caption d-md-block">
            <h3 style="text-align: right">${lotList[i].title}</h3>
          </div>
        </div>
        `;
    }
  }
}

async function getCars() {
  console.log("Getting cars");
  const carList = await getLots({
    _tag: "car",
    _bids: true,
  
  });
  console.log("CarList:", carList);
  return carList;
}

const carContainer = document.querySelector("#car-container");
async function generateCars(carList) {
  const placeholderImg =
    "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
  carContainer.innerHTML = "";
  carContainer.innerHTML += `<h2 class="pt-4">Cars</h2>`;

  for (let i = 0; i < 3; i++) {
    /* TODO Add this to skip lots that dont have img? */
    /*     if (lotList[i].media.length === 0) {
      continue;
    } */
    /* const countdownElement = countdown(lotList[i].endsAt); */
    carContainer.innerHTML += `
    <div class="col">
      <div class="card h-100">
       <img style="width: 100%; height: 200px; object-fit: cover;" src="${
         carList[i].media[0] ? carList[i].media[0] : placeholderImg
       }" class="card-img-top" alt="Missing Image...">
       <div style="padding-bottom: 0px !important" class="card-body d-flex flex-column justify-content-between">
         <div  class="pb-4">
         <h5 class="card-title fw-bold">${
          lotList[i].title ? lotList[i].title : "No title"
        }</h5>
           <p class="card-text">${
             carList[i].description ? carList[i].description : "No description"
           }</p>
         </div>
         <div class="d-flex justify-content-between pb-2">
           <p style="margin-bottom: 0px !important; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"
           class="card-text">Current bid: ${
           carList[i].bids && carList[i].bids.length > 0
             ? `<span class="fw-bold">${carList[i].bids.slice(-1)[0].amount} Credits</span>`
             : `<span class="fw-bold">No bids</span>`
         } </p>
           <a style="white-space: nowrap;" href="lot.html?id=${
             carList[i].id
           }">See details</a>
         </div>
       </div>
       <div class="card-footer">
         <small class="text-muted">${
           countdown(carList[i].endsAt).innerHTML
         }</small>
       </div>
      </div>
    </div>
    `;
  }
  toggleUI();
}

generateCarousel();
generateCars(await getCars());
