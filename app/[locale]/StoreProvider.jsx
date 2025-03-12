"use client";
import { makeStore } from "@/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function StoreProvider({ children }) {
  const storeRef = useRef(undefined);
  const persistorRef = useRef(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders

    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current); // 🔥 Ajout de persistStore
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
