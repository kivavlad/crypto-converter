import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";
import { IRatesResponse } from "../types/rates-types";

export const loadRates = createAsyncThunk<IRatesResponse, undefined>(
  "rates/loadRates",
  async function() {
    const response = await api.get('https://api.coincap.io/v2/rates');
    return await response.data as IRatesResponse;
  }
)