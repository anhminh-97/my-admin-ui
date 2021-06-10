import productReducer from "Features/Product/ProductSlice";
import categoryReducer from "Features/Category/CategorySlice";
import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const rootReducer = {
  product: productReducer,
  category: categoryReducer,
};

const Store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default Store;
