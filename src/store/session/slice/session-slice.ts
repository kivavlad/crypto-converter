import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  login: string;
  password: string;
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  login: '',
  password: '',
  loading: false,
  error: null,
}

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
})

export const { actions: sessionActions } = sessionSlice;
export const { reducer: sessionReducer } = sessionSlice;