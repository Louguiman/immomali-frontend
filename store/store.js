import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agent/agentSlice";
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";
import { apiSlice } from "@/features/api/api";
import authReducer from "@/features/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      properties: propertiesSlice,
      filter: filterSlice,
      agent: agentSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore non-serializable values for 'createListing' (which includes Files)
          ignoredActions: [
            "properties/setPropertyImages",
            "properties/addPropertyImage",
            "properties/removePropertyImage",
          ],
          ignoredPaths: ["properties.createListing.propertyImages"],
        },
      }).concat(apiSlice.middleware),
  });
};
// Typescript
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDisp  atch = typeof store.dispatch;
