import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadRates } from "../services/load-rates";
import { IRate, IRatesResponse } from "../types/rates-types";

interface IState {
  list: IRate[];
  symbols: string[];
  total: number;
  currentRate: IRate;
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  list: [],
  symbols: [],
  total: 0,
  currentRate: {
    id: '',
    symbol: '',
    currencySymbol: '',
    type: 'crypto',
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
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRates.fulfilled, (state, action: PayloadAction<IRatesResponse>) => {
        const data = action.payload.data ?? [];
        state.loading = false;
        state.error = null;

        if (data.length) {
          state.list = data;
          state.symbols = ['', ...data.map(item => item.symbol)];
          state.total = data.length;
        }
      })
      .addCase(loadRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error load rates';
      })
  },
})

export const { actions: ratesActions } = ratesSlice;
export const { reducer: ratesReducer } = ratesSlice;