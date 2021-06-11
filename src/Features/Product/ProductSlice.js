import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "Api/ProductApi";

export const getAllProducts = createAsyncThunk("product/getAllProducts", async (params) => {
  const { data, pagination } = await ProductApi.getAll(params);
  return { data, pagination };
});

export const addProduct = createAsyncThunk("product/addProduct", async (data) => {
  await ProductApi.add(data.value);
  return data;
});

export const updateProduct = createAsyncThunk("product/updateProduct", async (data) => {
  await ProductApi.update(data.updatedValue);
  return data;
});

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, mesResult }) => {
    await ProductApi.delete(id);
    return { id, mesResult };
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: { allProducts: [], loading: false, total: 0 },
  reducers: {},
  extraReducers: {
    [getAllProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.allProducts = action.payload.data;
      state.total = action.payload.pagination._totalRows;
      state.loading = false;
    },
    [getAllProducts.rejected]: (state, action) => {
      state.loading = false;
    },
    [addProduct.pending]: (state) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.allProducts = [action.payload.value, ...state.allProducts];
      action.payload.mesResult(true);
      state.loading = false;
    },
    [addProduct.rejected]: (state, action) => {
      action.payload.mesResult(false);
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
      action.payload.mesResult(true);
      state.loading = false;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      action.payload.mesResult(false);
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.allProducts = state.allProducts.filter((item) => item.id !== action.payload.id);
      action.payload.mesResult(true);
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      action.payload.mesResult(false);
    },
  },
});

const { reducer } = ProductSlice;
export default reducer;
