import {
    getMyProfile
} from "../service/auctionProfile.js"
const profileBtn = document.querySelector('#profile-btn')

const profile = await getMyProfile()

profileBtn.addEventListener('click', function () {

    const nameField = document.querySelector('#profile-name')
    const emailField = document.querySelector('#profile-email')
    const avatarField = document.querySelector('#register-avatar')

    nameField.value = profile.name
    emailField.value = profile.email
    avatarField.value = profile.avatar
})