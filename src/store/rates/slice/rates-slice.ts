import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadRates } from "../services/load-rates";
import { IRate, IRatesResponse } from "../types/rates-types";

interface IState {
  list: IRate[];
  currentRate: IRate;
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  list: [],
  currentRate: {
    id: '',
    symbol: '',
    currencySymbol: '',
    type: '',
    rateUsd: '',
  },
  loading: false,
  error: null,
}

const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    setCurrentRate: (state, action: PayloadAction<IRate>) => {
      state.currentRate = action.payload;
    }
  },
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