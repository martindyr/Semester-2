import {
    getUserName,
    getToken
} from "../storage.js";

import {
    notification
} from '../components/notification.js'

export async function getProfileLots(body) {
    const name = getUserName()
    const url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/listings`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    };
    try {
        const repsonse = await fetch(url + "?" + new URLSearchParams(body), options);
        const json = await repsonse.json();
        console.log("Profile Lots: ", json);
        return json;
    } catch (error) {
        console.log("We done goufe:", error);
    }
}

export async function getMyProfile() {
    const name = getUserName()
    const url = `https://api.noroff.dev/api/v1/auction/profiles/${name}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    };
    try {
        const repsonse = await fetch(url, options);
        const json = await repsonse.json();
        console.log("Profile Info", json);
        return json;
    } catch (error) {
        console.log("We done goufe:", error);
    }
}

// This function will handle the PUT request for updating a profile
export async function updateProfile(name, requestData) {
    const url = `https://api.noroff.dev/api/v1/auction/profiles/${name}/media`;
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(requestData),
    };

    try {
        const response = await fetch(url, options);
        const updatedProfile = await response.json();
        if (updatedProfile.name) {
            $("#profile-modal").modal("hide");
            notification("success", "You have updated you profile picture");
            return updatedProfile; // Return the updated lot if needed
        }
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}