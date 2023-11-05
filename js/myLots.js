import {
    createListing
} from './service/auctionListing.js'

const lotForm = document.querySelector('form')
const titleField = document.querySelector('#create-title')
const descriptionField = document.querySelector('#create-description')
const endingField = document.querySelector('#create-ending')


lotForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = titleField.value
    const description = descriptionField.value
    const endsAt = endingField.value
    const lot = {}

    console.log(title)

    if (title) {
      Object.assign(lot, {
        title: title
      })
    }
    if (description) {
      Object.assign(lot, {
        description: description
      })
    }
    if (endsAt) {
      Object.assign(lot, {
        endsAt: endsAt
      })
    }
    console.log(lot)
    createListing(lot)
});