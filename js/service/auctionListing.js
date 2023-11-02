export async function getListings() {
  const url = "https://api.noroff.dev/api/v1/auction/listings";
  const body = {};
  try {
    const repsonse = await fetch(url + "?" + new URLSearchParams(body));
    const json = await repsonse.json();
    return json;
  } catch (error) {
    console.log("We done goufe:", error);
  }
}
