import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthState } from "@/features/auth/types";
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
export interface RootState {
  auth: AuthState;
  // Add other slice states as needed
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
  properties: ReturnType<typeof propertiesSlice>;
  filter: ReturnType<typeof filterSlice>;
  agent: ReturnType<typeof agentSlice>;
  tenants: ReturnType<typeof tenantReducer>;
  notifications: ReturnType<typeof notificationReducer>;
}

// Export the AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Export typed hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Create and export the store
export const store = makeStore();

// Export the persistor
export const persistor = persistStore(store);
