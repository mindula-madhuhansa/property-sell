interface GoogleAutocompleteAddress {
  label: string;
  value: Value;
}

interface Value {
  description: string;
  matched_substrings: Matchedsubstring[];
  place_id: string;
  reference: string;
  structured_formatting: Structuredformatting;
  terms: Term[];
  types: string[];
}

interface Term {
  offset: number;
  value: string;
}

interface Structuredformatting {
  main_text: string;
  main_text_matched_substrings: Matchedsubstring[];
  secondary_text: string;
}

interface Matchedsubstring {
  length: number;
  offset: number;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface ListingFormValues {
  type: string;
  propertyType: string;
  bedroom: number;
  bathroom: number;
  floorArea: number;
  sellingPrice: number;
  description: string;
  profileImgUrl: string;
  username: string | null;
  listing_images: ListingImage[];
}

interface ListingImage {
  listing_id: number;
  url: string;
}
