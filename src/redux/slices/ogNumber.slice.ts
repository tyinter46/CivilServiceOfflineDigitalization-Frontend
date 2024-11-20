import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  ogNumber: ""
};

const ogNumberSlice = createSlice({
  name: "ogNumber",
  initialState,
  reducers: {
    setOgNumber: (state, action: PayloadAction<string>) => {
      state.ogNumber = action.payload;
    }
  }
});

export const { setOgNumber } = ogNumberSlice.actions;
const { reducer } = ogNumberSlice;
export default reducer;
