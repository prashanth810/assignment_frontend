import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllProductsApi } from "../services/Productservice";

const initialState = {
    products: [],
    loading: false,
    error: null,
};

export const getAllProducts = createAsyncThunk(
    "products/getAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetAllProductsApi();
            console.log("API Response:", response.data); // Log the entire response for debugging
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch products"
            );
        }
    }
);

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })

            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ProductSlice.reducer;