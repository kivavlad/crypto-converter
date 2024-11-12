import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadRates } from "../services/load-rates";
import { IRate, IRatesResponse } from "../types/rates-types";

interface IState {
  list: IRate[];
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  list: [],
  loading: false,
  error: null,
}

const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRates.fulfilled, (state, action: PayloadAction<IRatesResponse>) => {
        const data = action.payload.data ?? [];
        state.list = data;
        state.loading = false;
        state.error = null;
      })
      .addCase(loadRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error load rates';
      })
  },
})

export const { actions: ratesActions } = ratesSlice;
export const { reducer: ratesReducer } = ratesSlice;