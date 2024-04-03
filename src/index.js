import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  FLUSH,
  PAUSE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import storage from "redux-persist/lib/storage";
import authSlice from "./state/auth";
import cartSlice from "./state/cart";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, PURGE } from "redux-persist/es/constants";

const persistConfig = {
  key: "root",
  storage: storage,
};

const Reducers = combineReducers({ auth: authSlice, cart: cartSlice });
const persistedReducer = persistReducer(persistConfig, Reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, REGISTER, PERSIST, PURGE],
      },
    }),
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
