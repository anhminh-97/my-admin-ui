import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "Api/ProductApi";

export const getAllProducts = createAsyncThunk("product/getAllProducts", async (params) => {
  const { data, pagination } = await ProductApi.getAll(params);
  return { data, pagination };
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
  initialState: { allProducts: [], loading: false, total: 0 },
  reducers: {},
  extraReducers: {
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
    [addProduct.pending]: (state) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.allProducts = [action.payload, ...state.allProducts];
      // action.payload.mesResult(true);
      state.loading = false;
    },
    [addProduct.rejected]: (state) => {
      // action.payload.mesResult(false);
      state.loading = false;
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      // const data = action.payload.updatedValue;
      // state.allProducts = state.allProducts.map((item) => {
      //   if (item.id === data.id) {
      //     const { UpdatedData } = { ...item, data };
      //     return UpdatedData;
      //   } else return item;
      // });
      // action.payload.mesResult(true);
      state.loading = false;
    },
    [updateProduct.rejected]: (state) => {
      state.loading = false;
      // action.payload.mesResult(false);
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProducts = state.allProducts.filter((item) => item.id !== action.payload);
      // action.payload.mesResult(true);
    },
    [deleteProduct.rejected]: (state) => {
      state.loading = false;
      // action.payload.mesResult(false);
    },
  },
});

const { reducer } = ProductSlice;
export default reducer;
