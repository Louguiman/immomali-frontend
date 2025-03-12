import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Utilise AsyncStorage pour React Native
import { persistReducer, persistStore } from "redux-persist";
import agentSlice from "../features/agent/agentSlice";
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";
import { apiSlice } from "@/features/api/api";
import authReducer from "@/features/auth/authSlice";
import tenantReducer from "@/features/tenant/tenantsSlice";
import notificationReducer from "@/features/notifications/notificationsSlice";

// Configuration de Redux Persist pour auth
const authPersistConfig = {
  key: "auth",
  storage,
  // whitelist: ["auth"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: persistedAuthReducer, // Utilisation du reducer persisté
      properties: propertiesSlice,
      filter: filterSlice,
      agent: agentSlice,
      tenants: tenantReducer,
      notifications: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore non-serializable values for 'createListing' (which includes Files)
          ignoredActions: [
            "properties/setPropertyImages",
            "properties/addPropertyImage",
            "properties/removePropertyImage",
            "persist/PERSIST",
            "persist/REHYDRATE",
          ],
          ignoredPaths: ["properties.createListing.propertyImages"],
        },
      }).concat(apiSlice.middleware),
  });
};
// Typescript
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDisp  atch = typeof store.dispatch;

export const store = makeStore(); 
export const persistor = persistStore(store);
