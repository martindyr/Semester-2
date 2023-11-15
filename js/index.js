import { getLots } from "./service/auctionListing.js";

const carouselImgContainer = document.querySelector(".carousel-inner");
const lotList = await getLots({
  _active: true,
  sort: "title",
  sortORder: "asc",
});
t;

function generateCarousel() {
  console.log("running");
  for (let i = 0; i < lotList.length; i++) {
    if (lotList[i].media.length === 0) {
      continue;
    } else {
      const activeClass = i === 0 ? "active" : "";
      carouselImgContainer.innerHTML += `
        <div class="carousel-item ${activeClass}">
          <img src="${lotList[i].media[0]}" class="d-block w-100"" alt="">
        </div>
        `;
    }
  }
}

generateCarousel();
