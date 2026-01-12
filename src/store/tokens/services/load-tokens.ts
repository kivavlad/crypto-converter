import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";
import { ITokensResponse } from "../types";

export const loadTokens = createAsyncThunk<ITokensResponse, { search?: string }>(
  "tokens/loadTokens",
  async function({ search }) {
    const url = `/assets${search && `?search=${search}`}`;
    const response = await api.get(url);
    return response.data;
  }
)