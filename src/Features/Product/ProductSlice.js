import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "Api/ProductApi";

export const getAllProducts = createAsyncThunk("product/getAllProducts", async () => {
  const response = await ProductApi.getAll();
  return response;
});

export const addProduct = createAsyncThunk("product/addProduct", async (data) => {
  await ProductApi.add(data);
  return data;
});

export const updateProduct = createAsyncThunk("product/updateProduct", async (data) => {
  await ProductApi.update(data);
  return data;
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
  await ProductApi.delete(id);
  return id;
});

const ProductSlice = createSlice({
  name: "product",
  initialState: { allProducts: [], loading: false },
  reducers: {},
  extraReducers: {
    [getAllProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    },
    [getAllProducts.rejected]: (state, action) => {
      state.loading = false;
    },
    [addProduct.pending]: (state) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.allProducts = [action.payload, ...state.allProducts];
      // action.payload.mesCreate(true);
      state.loading = false;
    },
    [addProduct.rejected]: (state, action) => {
      // action.payload.mesCreate(false);
      state.loading = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.allProducts = state.allProducts.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
          };
        } else return item;
      });
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProducts = state.allProducts.filter((item) => item.id !== action.payload);
      // action.payload.mesDelete(true);
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      // action.payload.mesDelete(false);
    },
  },
});

const { reducer } = ProductSlice;
export default reducer;
