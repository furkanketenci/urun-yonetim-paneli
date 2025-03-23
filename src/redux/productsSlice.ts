import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../types';

interface IProductsState {
    items: IProduct[];
    loading: boolean;
}

const API_URL = "http://localhost:3002"

type ProductBody = Omit<IProduct, "id">;

const apiCall = async (url: string, method: string, body?: ProductBody) => {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }
    return response.json();
}

export const allProducts = createAsyncThunk(
    "allProducts",
    async () => {
        return await apiCall(`${API_URL}/products`, "GET");
    }
)

export const addProduct = createAsyncThunk(
    "addProduct",
    async (product: Omit<IProduct, "id">) => {
        return await apiCall(`${API_URL}/products`, "POST", product);
    }
)

export const updateProduct = createAsyncThunk(
    "updateProduct",
    async (product: IProduct) => {
        return await apiCall(`${API_URL}/products/${product.id}`, "PUT", product);
    }
)

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (productId: number) => {
        await apiCall(`${API_URL}/products/${productId}`, "DELETE");
        return productId;
    }
)

const initialState: IProductsState = {
    items: [],
    loading: false,
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
            if (index !== -1) {
                state.items[index] = action.payload
            }
        });
        builder.addCase((updateProduct.rejected), (state) => {
            state.loading = false;
        });
        // Ürünü güncelLe END

        // Ürünü sil START
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.items = state.items.filter((product) => product.id !== action.payload)
        })
        builder.addCase(deleteProduct.rejected, (state) => {
            state.loading = false;
        })
        // Ürünü sil END
    }
})


export default productsSlice.reducer;