import { createLot } from "./service/auctionListing.js";
import { getProfileLots } from "./service/auctionProfile.js";



/* Lot Form */
const lotForm = document.querySelector("form");
const titleField = document.querySelector("#create-title");
const descriptionField = document.querySelector("#create-description");
const endingField = document.querySelector("#create-ending");

const lotList = document.querySelector('#lot-list')
const myLots = await getProfileLots()

lotForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleField.value;
  const description = descriptionField.value;
  const endsAt = endingField.value;
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
  console.log(lot);
  createLot(lot);
 
  generateList(myLots)
});

function generateList(list) {
  lotList.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    lotList.innerHTML += `
    <p>title: ${list[i].title}</p>
`;
  }
}
generateList(myLots)


