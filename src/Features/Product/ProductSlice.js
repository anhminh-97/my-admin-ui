import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "Api/ProductApi";

export const getAllProducts = createAsyncThunk("product/getAllProducts", async (payload) => {
  const { data, pagination } = await ProductApi.getAll(payload);
  return { data, pagination };
});

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  const response = await ProductApi.get(id);
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
  initialState: { allProducts: [], loading: false, total: 0, productDetail: {} },
  reducers: {},
  extraReducers: {
    // Get all products
    [getAllProducts.pending]: (state) => {
      state.loading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      const result = action.payload;

      state.allProducts = result.data;
      state.total = result.pagination._totalRows;
      state.loading = false;
    },
    [getAllProducts.rejected]: (state) => {
      state.loading = false;
    },

    // Get a product
    [getProduct.pending]: (state) => {
      state.loading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.productDetail = action.payload;
      state.loading = false;
    },
    [getProduct.rejected]: (state) => {
      state.loading = false;
    },

    // Create a product
    [addProduct.pending]: (state) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.allProducts = [action.payload, ...state.allProducts];
      state.loading = false;
    },
    [addProduct.rejected]: (state) => {
      state.loading = false;
    },

    // Update a product
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      // const data = action.payload;
      // state.allProducts = state.allProducts
      //   .filter((item) => item.id === data.id)
      //   .map((item) => {
      //     const { UpdatedData } = { ...item, data };
      //     return UpdatedData;
      //   });
      state.loading = false;
    },
    [updateProduct.rejected]: (state) => {
      state.loading = false;
    },

    // Delete a product
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProducts = state.allProducts.filter((item) => item.id !== action.payload);
    },
    [deleteProduct.rejected]: (state) => {
      state.loading = false;
    },
  },
});

const { reducer } = ProductSlice;
export default reducer;
