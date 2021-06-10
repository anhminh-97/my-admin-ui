import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryApi from "Api/CategoryApi";

export const getAllCategories = createAsyncThunk("category/getAllCategories", async () => {
  const response = await CategoryApi.getAll();
  return response;
});

export const addCategory = createAsyncThunk("category/addCategory", async (data) => {
  await CategoryApi.add(data);
  return data;
});

export const updateCategory = createAsyncThunk("category/updateCategory", async (data) => {
  await CategoryApi.update(data);
  return data;
});

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id, mesDelete }) => {
    await CategoryApi.delete(id);
    return { id, mesDelete };
  }
);

const CategorySlice = createSlice({
  name: "category",
  initialState: { allCategories: [], loading: false },
  reducers: {},
  extraReducers: {
    [getAllCategories.pending]: (state) => {
      state.loading = true;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.allCategories = action.payload;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.loading = false;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.allCategories = [action.payload, ...state.allCategories];
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.allCategories = state.allCategories.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            name: action.payload.name,
          };
        } else return item;
      });
    },
    [deleteCategory.pending]: (state) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      action.payload.mesDelete(true);
      state.allCategories = state.allCategories.filter((item) => item.id !== action.payload.id);
      state.loading = false;
    },
    [deleteCategory.rejected]: (state, action) => {
      action.payload.mesDelete(false);
      state.loading = false;
    },
  },
});

const { reducer } = CategorySlice;
export default reducer;
