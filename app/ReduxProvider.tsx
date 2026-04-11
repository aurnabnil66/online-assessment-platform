"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        {children}
        <Footer />
      </PersistGate>
    </Provider>
  );
}
