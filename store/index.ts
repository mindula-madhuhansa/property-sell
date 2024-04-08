import { create } from "zustand";

interface ListingStoreState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  address: GoogleAutocompleteAddress | null;
  setAddress: (address: GoogleAutocompleteAddress) => void;

  coordinates: Coordinates | null;
  setCoordinates: (coordinates: Coordinates) => void;
}

export const useListingStore = create<ListingStoreState>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  address: null,
  setAddress: (address: GoogleAutocompleteAddress) => set({ address }),

  coordinates: null,
  setCoordinates: (coordinates: Coordinates) => set({ coordinates }),
}));
