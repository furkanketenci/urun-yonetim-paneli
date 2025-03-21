import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../types';

interface IProductsState {
    items: IProduct[];
    loading: boolean;
    error: string | null;
}

const API_URL = "http://localhost:3002"

export const addProduct = createAsyncThunk(
    "addProduct",
    async (product: Omit<IProduct, "id">) => {
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        })
        if (!response.ok) {
            throw new Error("Ürün eklenirken bir hata oluştu!")
        }
        const data = response.json();
        return data;
    }
)

const initialState: IProductsState = {
    items: [],
    loading: false,
    error: null
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ADD PRODUCT START
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.items.push(action.payload);
        });
        builder.addCase(addProduct.rejected, (state) => {
            state.loading = false;
        })
        // ADD PRODUCT END
    }
})


export default productsSlice.reducer;