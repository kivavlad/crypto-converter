import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalName } from "../types/modals-types";

interface IState {
  currentModal: ModalName;
}

const initialState: IState = {
  currentModal: '',
}

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<ModalName>) => {
      state.currentModal = action.payload;
      console.log(action.payload)
    },
    close: (state) => {
      state.currentModal = '';
    }
  }
})

export const { actions: modalsActions } = modalsSlice;
export const { reducer: modalsReducer } = modalsSlice;