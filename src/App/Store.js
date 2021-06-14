import productReducer from "Features/Product/ProductSlice";
import categoryReducer from "Features/Category/CategorySlice";
import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["product"],
};

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(Store);

export default Store;
