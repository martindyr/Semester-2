import {
  createLot,
  deleteLot,
  updateLot
} from "./service/auctionListing.js";
import {
  getProfileLots
} from "./service/auctionProfile.js";
import {
  countdown
} from "./components/countdown.js";

/* Lot Form */
const lotForm = document.querySelector("form");
const titleField = document.querySelector("#create-title");
const descriptionField = document.querySelector("#create-description");
const endingField = document.querySelector("#create-ending");
const mediaField = document.querySelector("#create-media");

const lotList = document.querySelector("#lot-list");
const myLots = await getProfileLots({
  _bids: true,
});

lotForm.addEventListener("submit", async function (event) {
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
  createLot(lot);

  const updatedList = await getProfileLots()
  generateList(updatedList);
});

function generateList(list) {
  lotList.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    lotList.innerHTML += `
    <div class="col">
      <div class="card h-100">
        <img style="width: 100%; height: 200px; object-fit: cover;" src="${
          list[i].media[0]
        }" class="card-img-top" alt="Missing Image...">
        <div class="card-body">
        <h5 class="card-title fw-bold">${
          list[i].title ? list[i].title : "No title"
        }</h5>
          <p class="card-text">${list[i].description}</p>
          <div class="d-flex justify-content-between pb-2">
          <p style="margin-bottom: 0px !important; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;" 
          class="card-text ellipsis">Current bid: ${
            list[i].bids && list[i].bids.length > 0
              ? `<span class="fw-bold">${list[i].bids.slice(-1)[0].amount} Credits</span>`
              : `<span class="fw-bold">No bids</span>`
          } </p>
            <a style="white-space: nowrap;" href="lot.html?id=${
              list[i].id
            }">See details</a>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button 
            id="${
              list[i].id
            }" class="btn btn-primary me-md-2 my-3" type="button" data-bs-toggle="modal"
            data-bs-target="#update-lot-modal">Edit
            </button>
            <button id="${
              list[i].id
            }" class="btn btn-danger my-3" type="button">Delete</button>
          </div>
        </div>
       <div class="card-footer">
         <small class="text-muted">${
           countdown(list[i].endsAt).innerHTML
         }</small>
       </div>
      </div>
    </div>
      `;
    attachUpdateListeners(list);
    attachDeleteListeners();
  }
}

function attachDeleteListeners() {
  const deleteBtns = document.querySelectorAll(".btn-danger");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async function (event) {
      const lotId = event.target.id;
      console.log(lotId);
      await deleteLotAndUpdateList(lotId);
    });
  });
}

function attachUpdateListeners(list) {
  const updateBtns = document.querySelectorAll(".me-md-2");
  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", async function (event) {
      const lotId = event.target.id;
      const selectedObject = list.find((obj) => obj.id === lotId);

      if (selectedObject) {
        let titleInput = document.querySelector("#update-title");
        titleInput.value = selectedObject.title;
        let descriptionInput = document.querySelector("#update-description");
        descriptionInput.value = selectedObject.description;
        let mediaInput = document.querySelector("#update-media");
        mediaInput.value = selectedObject.media;
        /* TODO add tags */
        const updateBtn = document.querySelector("#update-lot-btn");
        updateBtn.addEventListener("click", async function (event) {
          event.preventDefault();
          const updatedLot = {};
          if (titleInput.value != selectedObject.title) {
            Object.assign(updatedLot, {
              title: titleInput.value,
            });
          }

          if (descriptionInput.value != selectedObject.description) {
            Object.assign(updatedLot, {
              description: descriptionInput.value,
            });
          }

          if (mediaInput.value != selectedObject.media) {
            Object.assign(updatedLot, {
              media: [mediaInput.value],
            });
          }

          console.log("Updated Lot Object:", updatedLot);
          await updateLot(selectedObject.id, updatedLot);
          // Replace this with your fetch logic
          const updatedLots = await getProfileLots();

          // Re-render the list with the updated data
          generateList(updatedLots);
        });
      } else {
        console.log("Object not found");
      }
    });
  });
}

// Function to delete the lot and update the list
async function deleteLotAndUpdateList(lotId) {
  await deleteLot(lotId);

  // Replace this with your fetch logic
  const updatedLots = await getProfileLots();

  // Re-render the list with the updated data
  generateList(updatedLots);
}

generateList(myLots);