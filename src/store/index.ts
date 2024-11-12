import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./session/slice/session-slice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
