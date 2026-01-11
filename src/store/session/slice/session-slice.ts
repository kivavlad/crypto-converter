import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  login: string;
  password: string;
  access: string;
  isAuth: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: IState = {
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
        state.access = '1234';
        localStorage.setItem('access', state.access);
        state.isAuth = true;
        state.error = false;
      } else {
        state.isAuth = false;
        state.error = true;
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