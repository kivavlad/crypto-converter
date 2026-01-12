import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTokens } from "../services/load-tokens";
import type { ITokensState, IToken } from "../types";

const initialState: ITokensState = {
  list: [],
  total: 0,
  selected: null,
  loading: false,
  fetching: false,
  error: null,
}

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<IToken>) => {
      state.selected = action.payload;
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.fetching = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTokens.fulfilled, (state, action) => {
        const data = action.payload.data ?? [];
        state.loading = false;
        state.fetching = false;
        state.error = null;

        if (data.length) {
          state.list = data;
          state.total = data.length;
        }
      })
      .addCase(loadTokens.rejected, (state, action) => {
        state.loading = false;
        state.fetching = false;
        state.error = action.error.message ?? 'Error load tokens';
      })
  },
})

export const { actions: tokensActions } = tokensSlice;
export const { reducer: tokensReducer } = tokensSlice;