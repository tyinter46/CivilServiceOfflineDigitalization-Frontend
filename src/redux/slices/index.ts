import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth.slice";
import ogNumber from "./ogNumber.slice";
import { imageApi } from "services/image.service";

const rootReducer = combineReducers({
  auth,
  ogNumber,

  // settings,
  //   [meetingApi.reducerPath]: meetingApi.reducer,
  //   [userApi.reducerPath]: userApi.reducer,
  [imageApi.reducerPath]: imageApi.reducer
});

export default rootReducer;
