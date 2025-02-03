import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createListing: {
    userId: 1,
    title: "",
    description: "",
    type: "Rent", // Only "Rent" or "Sale"
    category: "", // New field for category
    price: 0,
    area: "",
    rooms: "1",
    beds: 1,
    baths: 1,
    garages: "",
    sqFt: 0,
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
    location: "",
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
  status: "idle", // For loading state tracking
  error: null,
  keyword: "",
  propertyType: "",
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
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    addPropertyType: (state, action) => {
      state.propertyType = action.payload;
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
      state.bathrooms = parseInt(action.payload);
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
      if (action.payload !== "")
        state.createListing.price = parseInt(action.payload);
    },
    setArea: (state, action) => {
      state.createListing.area = parseInt(action.payload);
    },
    setRooms: (state, action) => {
      state.createListing.rooms = parseInt(action.payload);
    },
    // New reducers for location
    setAddress: (state, action) => {
      state.createListing.address = action.payload;
      state.createListing.location = action.payload;
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
      if (action.payload !== "")
        state.createListing.beds = parseInt(action.payload);
    },
    setBaths: (state, action) => {
      if (action.payload !== "")
        state.createListing.baths = parseInt(action.payload);
    },
    setGarages: (state, action) => {
      if (action.payload !== "") state.createListing.garages = action.payload;
    },
    setSqFt: (state, action) => {
      state.createListing.sqFt = parseInt(action.payload);
    },
    setBuiltYear: (state, action) => {
      if (action.payload !== "")
        if (action.payload !== "")
          state.createListing.builtYear = parseInt(action.payload);
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
  addPropertyType,
  addLocation,
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
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
