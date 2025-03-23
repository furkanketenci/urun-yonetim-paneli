import { configureStore } from '@reduxjs/toolkit'
import productsReducer from "../../src/redux/productsSlice";
import modalReducer from "../../src/redux/modalSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        modal: modalReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;