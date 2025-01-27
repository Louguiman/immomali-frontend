import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agent/agentSlice";
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";
import { apiSlice } from "@/features/api/api";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    properties: propertiesSlice,
    filter: filterSlice,
    agent: agentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Typescript
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDisp  atch = typeof store.dispatch;
