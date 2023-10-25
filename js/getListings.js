export async function getListings() {
  const url = "https://api.noroff.dev/api/v1/auction/listings";
  try {
    const repsonse = await fetch(url);
    const json = await repsonse.json();
    console.log(json);
  } catch (error) {
    console.log("We done goufe:", error);
  }
}
