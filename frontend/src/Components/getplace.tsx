import axios from "axios";

export default async function getPlaces(query: string) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: "pk.eyJ1IjoibWFkaHVyaTExMSIsImEiOiJjbTJ5ZjJzNWUwMDZvMm5zY3h2cHRzczVoIn0.zeXl_ZP8HxJL0gAdFrbtLg",
        },
      }
    );

    return response.data.features;
  } catch (error) {
    console.error("There was an error while fetching places:", error);
  }
}