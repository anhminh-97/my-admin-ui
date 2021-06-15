import productReducer from "Features/Product/ProductSlice";
import categoryReducer from "Features/Category/CategorySlice";
import userReducer from "Features/Auth/UserSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const rootReducer = {
  product: productReducer,
  category: categoryReducer,
  user: userReducer,
};

const Store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default Store;
