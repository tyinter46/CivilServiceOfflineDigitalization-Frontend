import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import env from "configs";
import { IMAGE_TAG, USER_PROFILE_TAG } from "./CONSTANTS";
import type { RootState } from "redux/store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${env.API_BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth?.user.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  }
});

export const baseUserApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: [USER_PROFILE_TAG],
  endpoints: () => ({})
});

// will need it later
// const baseQueryWithLogout = async (
//     args: Parameters<typeof baseQuery>[0],
//     api: Parameters<typeof baseQuery>[1],
//     extraOptions: any
// )=>{
//     const result = await baseQuery(args, api, extraOptions);
//     if  (result.error && result.error.status === 401){
//         localStorage.removeItem(TESCOM_USER_DATA);
//             window.location.replace(LOGIN);

//     }
//     return result
// }

export const baseImageApi = createApi({
  reducerPath: "imageApi",
  baseQuery,
  tagTypes: [IMAGE_TAG],
  endpoints: () => ({})
});
