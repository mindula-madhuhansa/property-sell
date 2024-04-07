import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

export const getLatLngByAddress = async (
  place: string
): Promise<Coordinates> => {
  try {
    const results = await geocodeByAddress(place);
    const { lat, lng } = await getLatLng(results[0]);
    return { lat, lng };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};
