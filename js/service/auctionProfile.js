import {
    getUserName,
    getToken
} from "../storage.js";

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