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

// ürün ekleme işlemi start
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
// ürün ekleme işlemi start

// ürün güncelleme işlemi start

export const updateProduct = createAsyncThunk(
    "updateProduct",
    async (product: IProduct) => {
        const response = await fetch(`${API_URL}/products/${product.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        })
        if (!response.ok) {
            throw new Error("Ürün güncellenirken bir hata oluştu!")
        }
        const data = await response.json();
        return data;
    }
)

// ürün güncelleme işlemi end

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
        // Ürün ekleme start
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
        // Ürün ekleme END

        // Tüm ürünleri al START 

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

        // Tüm ürünleri al END 

        // Ürünü güncelle START
        builder.addCase((updateProduct.pending), (state) => {
            state.loading = true;
        });
        builder.addCase((updateProduct.fulfilled), (state, action) => {
            state.loading = false;
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index != -1) {
                state.items[index] = action.payload
            }
        });
        builder.addCase((updateProduct.rejected), (state) => {
            state.loading = false;
        });
        // Ürünü güncelLe END
    }
})


export default productsSlice.reducer;