import { createLot } from "./service/auctionListing.js";
import { getProfileLots } from "./service/auctionProfile.js";

/* Lot Form */
const lotForm = document.querySelector("form");
const titleField = document.querySelector("#create-title");
const descriptionField = document.querySelector("#create-description");
const endingField = document.querySelector("#create-ending");
const mediaField = document.querySelector("#create-media");

const lotList = document.querySelector("#lot-list");
const myLots = await getProfileLots();

lotForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleField.value;
  const description = descriptionField.value;
  const endsAt = endingField.value;
  const media = mediaField.value;
  const lot = {};

  console.log(title);

  if (title) {
    Object.assign(lot, {
      title: title,
    });
  }
  if (description) {
    Object.assign(lot, {
      description: description,
    });
  }
  if (endsAt) {
    Object.assign(lot, {
      endsAt: endsAt,
    });
  }
  if (media) {
    Object.assign(lot, {
      media: [media],
    });
  }
  console.log(lot);
  createLot(lot);

  /* TODO re-generate list after you have posted a new lot  */
  generateList(myLots);
});

function generateList(list) {
  lotList.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    lotList.innerHTML += `
    <div class="col">
      <div class="card h-100">
       <img src="${list[i].media[0]}" class="card-img-top" alt="Missing Image...">
       <div class="card-body">
         <h5 class="card-title">${list[i].title}</h5>
         <p class="card-text">${list[i].description}</p>
       </div>
       <div class="card-footer">
         <small class="text-muted">${list[i].endsAt}</small>
       </div>
      </div>
    </div>
      `;
  }
}
generateList(myLots);
