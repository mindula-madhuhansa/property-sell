"use client";

import { MapPinIcon } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { getLatLngByAddress } from "@/utils/getLatLngByAddress";
import { useListingStore } from "@/store";

export const AddressSearchInput = () => {
  const { setAddress, setCoordinates } = useListingStore();

  const handleChange = async (place: GoogleAutocompleteAddress | null) => {
    if (!place) return;

    setAddress(place);

    try {
      const coords = await getLatLngByAddress(place.label);
      setCoordinates(coords);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };
  return (
    <div className="flex items-center w-full rounded-md p-1 px-2 bg-orange-200 ">
      <MapPinIcon className="h-10 w-10  text-primary p-1.5" />
      <GooglePlacesAutocomplete
        selectProps={{
          placeholder: "Search property address",
          isClearable: true,
          className: "w-full",

          onChange: (place) => handleChange(place),
        }}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
      />
    </div>
  );
};
