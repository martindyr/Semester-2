import { getMyProfile, updateProfile } from "../service/auctionProfile.js";
import { getUserName } from "../storage.js";

const profileBtn = document.querySelector("#profile-btn");
const updateBtn = document.querySelector("#update-btn");
const profile = await getMyProfile();

profileBtn.addEventListener("click", async function () {
  const profile = await getMyProfile();

  const nameField = document.querySelector("#profile-name");
  const emailField = document.querySelector("#profile-email");
  const creditField = document.querySelector("#profile-credit");
  const avatarField = document.querySelector("#profile-avatar");

  nameField.value = profile.name;
  emailField.value = profile.email;
  creditField.value = profile.credits;
  avatarField.value = profile.avatar;
});

updateBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const avatarField = document.querySelector("#profile-avatar");
  const avatar = {
    avatar: avatarField.value,
  };
  const userName = getUserName();
  console.log(avatar, userName);
  await updateProfile(userName, avatar);
  const profile = await getMyProfile();
  setProfileImage(profile.avatar);
});

function setProfileImage(image) {
  profileBtn.innerHTML = `
    <img
    style="height: 32px; width: 32px; border-radius: 50%; margin-right: 5px; object-fit: cover;"
    src="${
      image
        ? image
        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
    }" alt="">Profile
    `;
}
setProfileImage(profile.avatar);
