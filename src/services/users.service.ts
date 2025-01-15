import env from "configs";
import axios from "axios";
// import { toast } from "react-toastify";
import { GET_USER, UPDATE_USER_PROFILE, USER_PROFILE_TAG } from "./CONSTANTS";
import fetch from "./utils/FetchInterceptor";
import { baseUserApi } from "./api";
import { settingsResponse, Settings } from "types";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${env.API_BASE_URL}${`/users`}`);
    console.log(response);
    const fetchedData = response.data.DATA.users.users;
    // const users = fetchedData.DATA.users.users;
    console.log(response);
    if (!response) {
      throw new Error("Network response was not ok");
    }
    return fetchedData;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


export const fetchUsersWithoutPopulation = async () => {
  try {
    const response = await axios.get(`${env.API_BASE_URL}${`/getUsers/basic`}`);
    console.log(response);
    const fetchedData = response.data.DATA.users.users;
    // const users = fetchedData.DATA.users.users;
    console.log(response);
    if (!response) {
      throw new Error("Network response was not ok");
    }
    return fetchedData;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUser = async (id: any) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}${`/user/${id}`}`);
    const userData = await fetch(`${env.API_BASE_URL}${`/user/${'675ff81d3f8a0725f567461e'}`}`); 
    console.log(userData)
    const fetchedData = await response.data;
    // console.log(fetchedData);
    const user = fetchedData?.DATA?.user;
    console.log(user);
    // if (fetchedData) {
    //   throw new Error("Network response was not ok");
    // }
    return user;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const userApi = baseUserApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<settingsResponse, string>({
      providesTags: [USER_PROFILE_TAG],
      query: (id) => `${GET_USER}/${id}`
    }),
    updateUserProfile: builder.mutation<settingsResponse, { id: string; details: Settings }>({
      query: ({ id, details }) => ({
        url: `${UPDATE_USER_PROFILE}/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: details
      }),
      invalidatesTags: [USER_PROFILE_TAG]
    
    })
  })
  
});

export const { useGetUserDetailsQuery, useUpdateUserProfileMutation } = userApi;
// gender,
// phoneNumber,
// tscFileNumber,
// schoolOfPresentPosting,
// schoolOfPreviousPosting,
// zone,
// nationality,
// stateOfOrigin,
// lgOfOrigin,
// ward,
// qualifications: { ...rest },
// subjectsTaught: { ...subjectsTaughtRest },
// dateOfPresentSchoolPosting,
// cadre,
// dateOfLastPromotion,
// pfa,
// pensionNumber,
// staffType,
// export const updateUser = async ({
//   userId,
//   gender,
//   phoneNumber,
//   tscFileNumber,
//   schoolOfPresentPosting,
//   schoolOfPreviousPosting,
//   zone,
//   nationality,
//   stateOfOrigin,
//   lgOfOrigin,
//   ward,
//   qualifications,
//   subjectsTaught,
//   dateOfPresentSchoolPosting,
//   cadre,
//   dateOfLastPromotion,
//   pfa,
//   pensionNumber,
//   staffType
// }: {
//   userId: string;
//   gender: string;
//   phoneNumber: string;
//   tscFileNumber: string;
//   schoolOfPresentPosting: string;
//   schoolOfPreviousPosting: string;
//   zone: string;
//   nationality: string;
//   stateOfOrigin: string;
//   lgOfOrigin: string;
//   ward: string;
//   qualifications: string[];
//   subjectsTaught: string[];
//   dateOfPresentSchoolPosting: string;
//   cadre: string;
//   dateOfLastPromotion: string;
//   pfa: string;
//   pensionNumber: string;
//   staffType: string;
// }) => {
//   const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Credentials": true
//   };

//   const configs = {
//     headers,
//     withCredentials: true
//   };

//   const payload = {
//     gender,
//     phoneNumber,
//     tscFileNumber,
//     schoolOfPresentPosting,
//     schoolOfPreviousPosting,
//     zone,
//     nationality,
//     stateOfOrigin,
//     lgOfOrigin,
//     ward,
//     qualifications,
//     subjectsTaught,
//     dateOfPresentSchoolPosting,
//     cadre,
//     dateOfLastPromotion,
//     pfa,
//     pensionNumber,
//     staffType
//   };

//   console.log("Payload:", payload);

//   try {
//     const response = await axios.patch(`${env.API_BASE_URL}/api/user/${userId}`, payload, configs);
//     console.log(response);
//     return toast.success(response.data.message);
//     // return response.data.message;
//   } catch (error: any) {
//     console.error("Error posting staff:", error);
//     toast.error(error.message || "An error occurred while posting staff.");
//     throw error; // Ensure any errors are thrown for proper handling
//   }
// };
