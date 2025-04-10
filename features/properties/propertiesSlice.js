import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedSearches: [], // Stores saved search filters
  favorites: [],
  currentPage: 1, // To track the current page
  itemsPerPage: 5, // You can adjust this based on your needs
  // Stores favorited property IDs
  recentlyViewed: [], // Stores recently viewed property IDs
  createListing: {
    userId: 0,
    title: "",
    description: "",
    type: "rent", // Only "Rent" or "Sale"
    category: "", // New field for category
    price: "",
    area: "",
    rooms: "1",
    beds: "",
    baths: "",
    garages: "",
    sqFt: "",
    builtYear: 2010,
    // New fields for location
    address: "",
    state: "",
    city: "",
    neighborhood: "",
    zipCode: "",
    country: "Mali", // Default country
    latitude: "",
    longitude: "",
    // New fields for media
    propertyImages: [], // Array of selected images
    attachments: [], //
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
  },
  status: "", // For loading state tracking
  error: null,
  keyword: "",
  type: "",
  location: "",
  price: {
    min: 0,
    max: 0,
  },
  amenities: [],
  bathrooms: "",
  bedrooms: "",
  garages: "",
  yearBuilt: "",
  area: {
    min: "",
    max: "",
  },
  length: 0,
  compareList: [],
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    // ✅ Saved Search Actions
    saveSearch: (state, action) => {
      state.savedSearches.push(action.payload);
    },
    removeSavedSearch: (state, action) => {
      state.savedSearches = state.savedSearches.filter(
        (search) => search.id !== action.payload
      );
    },
    // ✅ Compare Actions
    addToCompare: (state, action) => {
      if (!state.compareList.includes(action.payload)) {
        state.compareList.push(action.payload);
        localStorage.setItem("comparelist", JSON.stringify(state.compareList));
      }
    },
    removeFromCompare: (state, action) => {
      state.compareList = state.compareList.filter(
        (id) => id !== action.payload
      );
      localStorage.setItem("comparelist", JSON.stringify(state.compareList));
    },
    clearCompareList: (state) => {
      state.compareList = [];
      localStorage.removeItem("comparelist");
    },

    // ✅ Favorites Actions
    addToFavorites: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

    // ✅ Recently Viewed Actions
    addToRecentlyViewed: (state, action) => {
      state.recentlyViewed = [
        action.payload,
        ...state.recentlyViewed.filter((id) => id !== action.payload),
      ].slice(0, 10); // Keep only the last 10 viewed
      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(state.recentlyViewed)
      );
    },
    clearRecentlyViewed: (state) => {
      state.recentlyViewed = [];
      localStorage.removeItem("recentlyViewed");
    },

    // ✅ Load from Local Storage on App Start
    loadFromStorage: (state) => {
      const storedFavorites = localStorage.getItem("favorites");
      const storedRecentlyViewed = localStorage.getItem("recentlyViewed");
      if (storedFavorites) state.favorites = JSON.parse(storedFavorites);
      if (storedRecentlyViewed)
        state.recentlyViewed = JSON.parse(storedRecentlyViewed);
    },

    addKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    addType: (state, action) => {
      state.type = action.payload;
    },
    addCategory: (state, action) => {
      state.category = action.payload;
    },
    addLocation: (state, action) => {
      state.location = action.payload;
    },
    addPrice: (state, action) => {
      state.price.min = action.payload.min;
      state.price.max = action.payload.max;
    },
    addAmenities: (state, action) => {
      const isExist = state.amenities.some((item) => item === action.payload);
      if (!isExist) {
        state.amenities.push(action.payload);
      } else {
        state.amenities = state.amenities.filter(
          (item) => item !== action.payload
        );
      }
    },
    resetAmenities: (state, action) => {
      state.amenities = [];
    },
    addStatus: (state, action) => {
      state.status = action.payload;
    },
    addBathrooms: (state, action) => {
      state.bathrooms = action.payload;
    },
    addBedrooms: (state, action) => {
      state.bedrooms = action.payload;
    },
    addGarages: (state, action) => {
      state.garages = action.payload;
    },
    addYearBuilt: (state, action) => {
      state.yearBuilt = action.payload;
    },
    addAreaMin: (state, action) => {
      state.area.min = action.payload;
    },
    addAreaMax: (state, action) => {
      state.area.max = action.payload;
    },
    addLength: (state, action) => {
      state.length = action.payload;
    },
    addProperty: (state, action) => {
      state.properties.push(action.payload);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPropertyTitle: (state, action) => {
      state.createListing.title = action.payload;
    },
    setPropertyDescription: (state, action) => {
      state.createListing.description = action.payload;
    },
    setType: (state, action) => {
      state.createListing.type = action.payload;
    },
    setCategory: (state, action) => {
      state.createListing.category = action.payload;
    },
    setPrice: (state, action) => {
      if (action.payload !== "") state.createListing.price = action.payload;
    },
    setArea: (state, action) => {
      state.createListing.area = action.payload;
    },
    setRooms: (state, action) => {
      state.createListing.rooms = action.payload;
    },
    // New reducers for location
    setAddress: (state, action) => {
      state.createListing.address = action.payload;
    },
    setState: (state, action) => {
      state.createListing.state = action.payload;
    },
    setCity: (state, action) => {
      state.createListing.city = action.payload;
    },
    setNeighborhood: (state, action) => {
      state.createListing.neighborhood = action.payload;
    },
    setZipCode: (state, action) => {
      state.createListing.zipCode = action.payload;
    },
    setCountry: (state, action) => {
      state.createListing.country = action.payload;
    },
    setLatitude: (state, action) => {
      state.createListing.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.createListing.longitude = action.payload;
    },
    setStreetView: (state, action) => {
      state.createListing.streetView = action.payload;
    },

    setBeds: (state, action) => {
      if (action.payload !== "") state.createListing.beds = action.payload;
    },
    setBaths: (state, action) => {
      if (action.payload !== "") state.createListing.baths = action.payload;
    },
    setGarages: (state, action) => {
      if (action.payload !== "") state.createListing.garages = action.payload;
    },
    setSqFt: (state, action) => {
      state.createListing.sqFt = action.payload;
    },
    setBuiltYear: (state, action) => {
      if (action.payload !== "")
        if (action.payload !== "")
          state.createListing.builtYear = action.payload;
    },
    // New reducers for media
    setPropertyImages: (state, action) => {
      state.createListing.propertyImages = action.payload;
    },
    addPropertyImage: (state, action) => {
      state.createListing.propertyImages.push(action.payload);
    },
    removePropertyImage: (state, action) => {
      state.createListing.propertyImages =
        state.createListing.propertyImages.filter(
          (img) => img.name !== action.payload
        );
    },
    setAttachments: (state, action) => {
      state.createListing.attachments = action.payload;
    },
    addAttachment: (state, action) => {
      state.createListing.attachments.push(action.payload);
    },
    removeAttachment: (state, action) => {
      state.createListing.attachments = state.createListing.attachments.filter(
        (file) => file.name !== action.payload
      );
    },
    // Amenities
    setAmenities: (state, action) => {
      state.createListing.amenities = {
        ...state.createListing.amenities,
        ...action.payload,
      };
    },
    toggleAmenity: (state, action) => {
      const { amenity, value } = action.payload;
      state.createListing.amenities[amenity] = value;
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
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
