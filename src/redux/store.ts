import { configureStore } from "@reduxjs/toolkit";
import { imageApi } from "services/image.service";
import ogNumberReducer from "./slices/ogNumber.slice"
import { userApi } from "services/users.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // Add the userApi reducer
    [imageApi.reducerPath]: imageApi.reducer, // Add the imageApi reducer
    auth: authReducer,
    ogNumber: ogNumberReducer, 
    // other reducers can go here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware) // Add the userApi middleware
      .concat(imageApi.middleware), // Add the imageApi middleware
  devTools: true
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
