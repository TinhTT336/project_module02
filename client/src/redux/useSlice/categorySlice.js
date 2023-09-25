import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//goi API tat ca category
export const getCategory = createAsyncThunk(
  "getCategory",
  async ({ searchText, sort }) => {
    if (searchText !== undefined || sort !== undefined) {
      const response = await axios.get(
        `http://localhost:3000/categories?_sort=id&_order=${sort}&category_name_like=${searchText}`
      );
      return response.data;
    } else {
      const response = await axios.get(
        `http://localhost:3000/categories/?_sort=id&_order=asc`
      );
      return response.data;
    }
  }
);

//goi API xoa 1 category theo id
export const deleteCategoryById = createAsyncThunk(
  "deleteCategoryById",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/categories/${id}`
    );
    // console.log(response);
    return category.id;
  }
);

//goi API them moi
export const addCategory = createAsyncThunk(
  "addCategory",
  async (newCategory) => {
    await axios.post("http://localhost:3000/categories", newCategory);
    return newCategory;
  }
);

//goi API edit category
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (cate) => {
    const { id, ...data } = cate;
    // console.log("id: ", id, "data: ", data);
    await axios.put(`http://localhost:3000/categories/${cate.id}`, data);
    return cate;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    mess: "no mess",
    isLoadingGet: false,
    isLoadingChange: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        return {
          ...state,
          mess: "pending",
          isLoadingGet: true,
        };
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        return {
          ...state,
          mess: "ok",
          data: action.payload,
          isLoadingGet: false,
        };
      })
      .addCase(getCategory.rejected, (state) => {
        return {
          ...state,
          mess: "no",
          isLoadingGet: false,
        };
      })
      .addCase(deleteCategoryById.pending, (state) => {
        return {
          ...state,
          mess: "pending delete",
          isLoadingChange: true,
        };
      })
      .addCase(deleteCategoryById.fulfilled, (state) => {
        console.log("thanh cong");
        return {
          ...state,
          mess: "ok delete",
          isLoadingChange: false,
        };
      })
      .addCase(addCategory.pending, (state) => {
        return {
          ...state,
          mess: "pending add",
          isLoadingChange: true,
        };
      })
      .addCase(addCategory.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke add",
          isLoadingChange: false,
        };
      })
      .addCase(addCategory.rejected, (state) => {
        return {
          ...state,
          mess: "xoa khong thanh cong",
          isLoadingChange: false,
        };
      })
      .addCase(updateCategory.pending, (state) => {
        return {
          ...state,
          mess: "pending update",
          isLoadingChange: true,
        };
      })
      .addCase(updateCategory.fulfilled, (state) => {
        return {
          ...state,
          mess: "oke update",
          isLoadingChange: false,
        };
      })
      .addCase(updateCategory.rejected, (state) => {
        return {
          ...state,
          mess: "no update",
          isLoadingChange: false,
        };
      });
  },
});

export default categorySlice.reducer;
