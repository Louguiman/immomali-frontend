"use client";
import { makeStore } from "@/store/store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, Persistor } from "redux-persist";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = useState<ReturnType<typeof makeStore>>();
  const [persistor, setPersistor] = useState<Persistor>();

  // Ensure store and persistor are only created on the client side
  useEffect(() => {
    const newStore = makeStore();
    const newPersistor = persistStore(newStore);
    setStore(newStore);
    setPersistor(newPersistor);
  }, []);

  // Show loading state until store is ready
  if (!store || !persistor) {
    return null; // or a loading spinner
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
