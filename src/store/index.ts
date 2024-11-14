import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "./session/slice/session-slice";
import { ratesReducer } from "./rates/slice/rates-slice";
import { modalsReducer } from "./modals/slice/modals-slice";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    rates: ratesReducer,
    modals: modalsReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
