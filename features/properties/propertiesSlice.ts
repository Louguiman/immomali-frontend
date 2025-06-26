import { createSlice } from "@reduxjs/toolkit";
import { WritableDraft } from 'immer';

interface Amenities {
  id?: number;
  airConditioning: boolean;
  barbeque: boolean;
  dryer: boolean;
  gym: boolean;
  laundry: boolean;
  lawn: boolean;
  microwave: boolean;
  outdoorShower: boolean;
  refrigerator: boolean;
  sauna: boolean;
  swimmingPool: boolean;
  tvCable: boolean;
  washer: boolean;
  wifi: boolean;
  windowCoverings: boolean;
  images?: any[];
}

interface Listing {
  id: number;
  userId: number;
  title: string;
  description: string;
  type: string;
  category: string;
  price: number;
  area: string;
  rooms: string;
  beds: string;
  baths: string;
  garages: string;
  sqFt: string;
  builtYear: number;
  address: string;
  state: string;
  city: string;
  neighborhood: string;
  zipCode: string;
  country: string;
  latitude: string;
  longitude: string;
  streetView: string;
  propertyImages: any[];
  attachments: any[];
  amenities: Amenities;
}

interface PriceRange {
  min: number;
  max: number;
}

interface AreaRange {
  min: string;
  max: string;
}

interface PropertiesState {
  savedSearches: any[];
  favorites: any[];
  newImages: File[];
  newAttachments: File[];
  deletedImages: any[];
  deletedAttachment: any[];
  currentPage: number;
  itemsPerPage: number;
  recentlyViewed: any[];
  createListing: Listing;
  status: string;
  error: string | null;
  keyword: string;
  type: string;
  location: string;
  price: PriceRange;
  amenities: string[];
  bathrooms: string;
  bedrooms: string;
  garages: string;
  yearBuilt: string;
  area: AreaRange;
  length: number;
  compareList: any[];
}

const initialListingState: Listing = {
  id: 0,
  userId: 0,
  title: "",
  description: "",
  type: "rent",
  category: "",
  price: 0, // Changed from empty string to 0 to match number type
  area: "",
  rooms: "1",
  beds: "",
  baths: "",
  garages: "",
  sqFt: "",
  builtYear: 2010,
  address: "",
  state: "",
  city: "",
  neighborhood: "",
  zipCode: "",
  country: "Mali",
  latitude: "",
  longitude: "",
  streetView: "",
  propertyImages: [],
  attachments: [],
  amenities: {
    airConditioning: false,
    barbeque: false,
    dryer: false,
    gym: false,
    laundry: false,
    lawn: false,
    microwave: false,
    outdoorShower: false,
    refrigerator: false,
    sauna: false,
    swimmingPool: false,
    tvCable: false,
    washer: false,
    wifi: false,
    windowCoverings: false,
  },
};

const initialState: PropertiesState = {
  savedSearches: [],
  favorites: [],
  newImages: [], // Local File objects
  newAttachments: [], // Local File objects
  deletedImages: [],
  deletedAttachment: [],
  currentPage: 1,
  itemsPerPage: 5,
  recentlyViewed: [],
  createListing: { ...initialListingState },
  status: "",
  error: null,
  keyword: "",
  type: "",
  location: "",
  price: { min: 0, max: 0 },
  amenities: [],
  bathrooms: "",
  bedrooms: "",
  garages: "",
  yearBuilt: "",
  area: { min: "", max: "" },
  length: 0,
  compareList: [],
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addNewImage(state, action: { payload: File }) {
      state.newImages.push(action.payload);
    },
    addNewAttachment(state, action: { payload: File }) {
      state.newAttachments.push(action.payload);
    },
    markImageForDeletion(state, action: { payload: any }) {
      const id = action.payload;
      state.createListing.propertyImages =
        state.createListing.propertyImages.filter((img) => img.id !== id);
      state.deletedImages.push(id);
    },
    markIAttachmentForDeletion(state, action: { payload: any }) {
      const id = action.payload;
      state.createListing.attachments = state.createListing.attachments.filter(
        (img) => img !== id
      );
      state.deletedAttachment.push(id);
    },
    removeNewImage(state, action: { payload: string }) {
      const name = action.payload;
      state.newImages = state.newImages.filter((file) => file.name !== name);
    },
    removeNewAttachment(state, action: { payload: string }) {
      const name = action.payload;
      state.newAttachments = state.newAttachments.filter(
        (file) => file.name !== name
      );
    },
    resetDeletedImages(state) {
      state.deletedImages = [];
    },
    saveSearch(state, action: { payload: any }) {
      state.savedSearches.push(action.payload);
    },
    removeSavedSearch(state, action: { payload: any }) {
      state.savedSearches = state.savedSearches.filter(
        (search) => search !== action.payload
      );
    },
    addToCompare(state, action: { payload: any }) {
      state.compareList.push(action.payload);
    },
    removeFromCompare(state, action: { payload: any }) {
      state.compareList = state.compareList.filter(
        (item) => item !== action.payload
      );
    },
    clearCompareList(state) {
      state.compareList = [];
    },
    addToFavorites(state, action: { payload: any }) {
      state.favorites.push(action.payload);
    },
    setCurrentPage(state, action: { payload: number }) {
      state.currentPage = action.payload;
    },
    removeFromFavorites(state, action: { payload: any }) {
      state.favorites = state.favorites.filter((fav) => fav !== action.payload);
    },
    addToRecentlyViewed(state, action: { payload: any }) {
      state.recentlyViewed.push(action.payload);
    },
    clearRecentlyViewed(state) {
      state.recentlyViewed = [];
    },
    loadFromStorage: (_state: WritableDraft<PropertiesState>, action: { payload: PropertiesState }) => {
      return { ...action.payload };
    },
    addKeyword(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.keyword = action.payload;
    },
    addType(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.type = action.payload;
    },
    addCategory(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.category = action.payload;
    },
    addLocation(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.location = action.payload;
    },
    addPrice(state: WritableDraft<PropertiesState>, action: { payload: PriceRange }) {
      state.price = action.payload;
    },
    addAmenities(state: WritableDraft<PropertiesState>, action: { payload: string[] }) {
      state.amenities = action.payload;
    },
    resetAmenities(state: WritableDraft<PropertiesState>) {
      state.amenities = [];
    },
    addStatus(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.status = action.payload;
    },
    addBathrooms(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.bathrooms = action.payload;
    },
    addBedrooms(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.bedrooms = action.payload;
    },
    addGarages(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.garages = action.payload;
    },
    addYearBuilt(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.yearBuilt = action.payload;
    },
    addAreaMin(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.area.min = action.payload;
    },
    addAreaMax(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.area.max = action.payload;
    },
    addLength(state: WritableDraft<PropertiesState>, action: { payload: number }) {
      state.length = action.payload;
    },
    addProperty(state: WritableDraft<PropertiesState>, action: { payload: Listing }) {
      state.createListing = action.payload;
    },
    setStatus(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.status = action.payload;
    },
    setError(state: WritableDraft<PropertiesState>, action: { payload: string | null }) {
      state.error = action.payload;
    },
    setPropertyTitle(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.title = action.payload;
    },
    setPropertyDescription(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.description = action.payload;
    },
    setType(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.type = action.payload;
    },
    setCategory(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.category = action.payload;
    },
    setPrice(state: WritableDraft<PropertiesState>, action: { payload: string | number }) {
      if (action.payload !== "" && action.payload !== undefined) {
        state.createListing.price = typeof action.payload === 'string' 
          ? parseFloat(action.payload) || 0 
          : action.payload;
      }
    },
    setArea(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.area = action.payload;
    },
    setRooms(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.rooms = action.payload;
    },
    setAddress(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.address = action.payload;
    },
    setState(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.state = action.payload;
    },
    setCity(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.city = action.payload;
    },
    setNeighborhood(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.neighborhood = action.payload;
    },
    setZipCode(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.zipCode = action.payload;
    },
    setCountry(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.country = action.payload;
    },
    setLatitude(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.latitude = action.payload;
    },
    setLongitude(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.longitude = action.payload;
    },
    setStreetView(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.streetView = action.payload;
    },
    setBeds(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      if (action.payload !== "") state.createListing.beds = action.payload;
    },
    setBaths(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      if (action.payload !== "") state.createListing.baths = action.payload;
    },
    setGarages(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      if (action.payload !== "") state.createListing.garages = action.payload;
    },
    setSqFt(state: WritableDraft<PropertiesState>, action: { payload: string }) {
      state.createListing.sqFt = action.payload;
    },
    setBuiltYear(state: WritableDraft<PropertiesState>, action: { payload: number }) {
      state.createListing.builtYear = action.payload;
    },
    setPropertyImages(state: WritableDraft<PropertiesState>, action: { payload: any[] }) {
      state.createListing.propertyImages = action.payload;
    },
    addPropertyImage(state: WritableDraft<PropertiesState>, action: { payload: any }) {
      state.createListing.propertyImages.push(action.payload);
    },
    removePropertyImage(state: WritableDraft<PropertiesState>, action: { payload: any }) {
      state.createListing.propertyImages =
        state.createListing.propertyImages.filter(
          (img) => img !== action.payload
        );
    },
    setAttachments(state: WritableDraft<PropertiesState>, action: { payload: any[] }) {
      state.createListing.attachments = action.payload;
    },
    addAttachment(state: WritableDraft<PropertiesState>, action: { payload: any }) {
      state.createListing.attachments.push(action.payload);
    },
    removeAttachment(state: WritableDraft<PropertiesState>, action: { payload: any }) {
      state.createListing.attachments = state.createListing.attachments.filter(
        (att) => att !== action.payload
      );
    },
    setAmenities(state: WritableDraft<PropertiesState>, action: { payload: Amenities }) {
      state.createListing.amenities = action.payload;
    },
    toggleAmenity: (state: WritableDraft<PropertiesState>, action: { payload: keyof Amenities }) => {
      if (action.payload in state.createListing.amenities) {
        const key = action.payload as keyof typeof state.createListing.amenities;
        (state.createListing.amenities[key] as boolean) = !state.createListing.amenities[key];
      }
    },
    setCreateListing: (state: WritableDraft<PropertiesState>, action: { payload: Partial<Listing> }) => {
      state.createListing = {
        ...state.createListing,
        ...action.payload,
        amenities: {
          ...state.createListing.amenities,
          ...(action.payload.amenities || {})
        }
      } as Listing;
    },
    resetCreateListing(state: WritableDraft<PropertiesState>) {
      state.createListing = { ...initialListingState };
    },
  },
});

export const {
  addKeyword,
  addType,
  addLocation,
  addCategory,
  addPrice,
  addAmenities,
  addStatus,
  addBathrooms,
  addBedrooms,
  addGarages,
  addYearBuilt,
  addAreaMin,
  addAreaMax,
  addLength,
  addProperty,
  setStatus,
  setError,
  setPropertyTitle,
  setPropertyDescription,
  setType,
  setCategory,
  setPrice,
  setArea,
  setRooms,
  setAddress,
  setState,
  setCity,
  setNeighborhood,
  setZipCode,
  setCountry,
  setLatitude,
  setLongitude,
  setStreetView,
  setBeds,
  setBaths,
  setGarages,
  setSqFt,
  setBuiltYear,
  setPropertyImages,
  addPropertyImage,
  removePropertyImage,
  setAttachments,
  addAttachment,
  removeAttachment,
  setAmenities,
  toggleAmenity,
  resetAmenities,
  saveSearch,
  removeSavedSearch,
  addToFavorites,
  removeFromFavorites,
  addToRecentlyViewed,
  clearRecentlyViewed,
  loadFromStorage,
  addToCompare,
  removeFromCompare,
  setCurrentPage,
  clearCompareList,
  setCreateListing,
  resetCreateListing,
  resetDeletedImages,
  addNewImage,
  removeNewImage,
  markImageForDeletion,
  addNewAttachment,
  markIAttachmentForDeletion,
  removeNewAttachment,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
