

import { createSlice } from "@reduxjs/toolkit"
import { IProduct } from "../types";

interface IModal {
    isShow: boolean;
    modalContent: IProduct | null;
}


const initialState: IModal = {
    isShow: false,
    modalContent: null,
}
export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showAndHide: (state, action) => {
            if (!action.payload) {
                state.modalContent = null;
            }
            state.isShow = action.payload;
        },
        setModalContent: (state, action) => {
            state.modalContent = action.payload
        }

    }
})

export const { showAndHide, setModalContent } = modalSlice.actions;

export default modalSlice.reducer;