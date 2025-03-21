import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../types';

interface IProductsState {
    items: IProduct[];
    loading: boolean;
    error: string | null;
}

const API_URL = "http://localhost:3002"

// tüm ürünleri getirme işlemi start

export const allProducts = createAsyncThunk(
    "allProducts",
    async () => {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error("Ürünler çekilirken bir hata oluştu!")
        }
        const data = await response.json();
        return data;
    }
)

// tüm ürünleri getirme işlemi end

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
        const data = await response.json();
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

        // GET ALL PRODUCTS START 

        builder.addCase(allProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(allProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase((allProducts.rejected), (state) => {
            state.loading = false;
        })

        // GET ALL PRODUCTS END 
    }
})


export default productsSlice.reducer;