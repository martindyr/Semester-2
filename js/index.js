import {
  getLots
} from './service/auctionListing.js'

const image = document.querySelector('#myImage')
image.onload = function () {
  console.log('success')
}
image.onerror = function (event) {
  console.log('Failed')
  console.log('Failed', event)
}
const carouselImgContainer = document.querySelector('.carousel-inner')
const lotList = await getLots({
  sortORder: 'desc',
  sort: 'created'
})

function generateCarousel() {
  console.log('running')
  for (let i = 0; i < lotList.length; i++) {
    if (lotList[i].media.length === 0) {
      continue
    } else {
      const activeClass = i === 0 ? "active" : "";
      carouselImgContainer.innerHTML += `
        <div class="carousel-item ${activeClass}">
          <img src="${lotList[i].media[0]}" class="d-block w-100" alt="">
        </div>
        `;

    }
  }
}


generateCarousel()