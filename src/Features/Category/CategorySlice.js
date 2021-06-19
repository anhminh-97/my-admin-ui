import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryApi from "Api/CategoryApi";

export const getAllCategories = createAsyncThunk("category/getAllCategories", async () => {
  const response = await CategoryApi.getAll();
  return response;
});

export const getCategoriesFilter = createAsyncThunk(
  "category/getCategoriesFilter",
  async (payload) => {
    const { data, pagination } = await CategoryApi.getAll(payload);
    return { data, pagination };
  }
);

export const addCategory = createAsyncThunk("category/addCategory", async (data) => {
  await CategoryApi.add(data);
  return data;
});

export const updateCategory = createAsyncThunk("category/updateCategory", async (data) => {
  await CategoryApi.update(data);
  return data;
});

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id) => {
  await CategoryApi.delete(id);
  return id;
});

const CategorySlice = createSlice({
  name: "category",
  initialState: { allCategories: [], loading: false, total: 0 },
  reducers: {},
  extraReducers: {
    // get all categories
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

    // get filter categories
    [getCategoriesFilter.pending]: (state) => {
      state.loading = true;
    },
    [getCategoriesFilter.fulfilled]: (state, action) => {
      const result = action.payload;

      state.allCategories = result.data;
      state.total = result.pagination._totalRows;
      state.loading = false;
    },
    [getCategoriesFilter.rejected]: (state) => {
      state.loading = false;
    },

    // Create category
    [addCategory.pending]: (state) => {
      state.loading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.allCategories = [action.payload, ...state.allCategories];
      state.loading = false;
    },
    [addCategory.rejected]: (state) => {
      state.loading = false;
    },

    // Update category
    [updateCategory.pending]: (state) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      // state.allCategories = state.allCategories.map((item) => {
      //   if (item.id === action.payload.id) {
      //     return {
      //       ...item,
      //       name: action.payload.name,
      //     };
      //   } else return item;
      // });
      state.loading = false;
    },
    [updateCategory.rejected]: (state, action) => {
      state.loading = false;
    },

    // Delete category
    [deleteCategory.pending]: (state) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.allCategories = state.allCategories.filter((item) => item.id !== action.payload);
      state.loading = false;
    },
    [deleteCategory.rejected]: (state) => {
      state.loading = false;
    },
  },
});

const { reducer } = CategorySlice;
export default reducer;
