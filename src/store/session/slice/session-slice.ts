import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ISessionState } from "../types";

const initialState: ISessionState = {
  login: 'demo',
  password: 'demo',
  access: localStorage.getItem('access') || '',
  isAuth: false,
  loading: false,
  error: false,
}

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{login: string, password: string}>) => {
      if (state.login === action.payload.login && state.password === action.payload.password) {
        state.access = Date.now().toString();
        localStorage.setItem('access', state.access);
        state.isAuth = true;
        state.error = false;
      } else {
        state.isAuth = false;
        state.error = true;
      }
    },

    checkAuth: (state) => {
      if (state.access) {
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },

    signOut: () => {
      localStorage.removeItem('access');
      return initialState;
    }
  },
})

export const { actions: sessionActions } = sessionSlice;
export const { reducer: sessionReducer } = sessionSlice;