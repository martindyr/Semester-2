import {
    getMyProfile
} from "../service/auctionProfile.js"
const profileBtn = document.querySelector('#profile-btn')



profileBtn.addEventListener('click', async function () {
    const profile = await getMyProfile()

    const nameField = document.querySelector('#profile-name')
    const emailField = document.querySelector('#profile-email')
    const creditField = document.querySelector('#profile-credit')
    const avatarField = document.querySelector('#register-avatar')

    nameField.value = profile.name
    emailField.value = profile.email
    creditField.value = profile.credits
    avatarField.value = profile.avatar
})