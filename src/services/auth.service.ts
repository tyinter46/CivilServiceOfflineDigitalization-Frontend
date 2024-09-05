import axios from "axios";
import env from "configs";

import authHeader from "./auth-headers";

import {
  TESCOM_USER_DATA,
  LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOG_OUT,
  // SIGNUP,
  UPDATE_PASSWORD
} from "./CONSTANTS";

export const signin = async ({ ogNumber, password }: { ogNumber: string; password: string }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true
  };

  const configs = {
    headers,
    withCredentials: true
  };

  return await axios
    .post(
      `${env.API_BASE_URL}/${LOGIN}`,
      {
        ogNumber,
        password
      },
      configs
    )
    .then((res) => {
      const data = res.data;
      if (data?.DATA?.accessToken) {
        localStorage.setItem(TESCOM_USER_DATA, JSON.stringify(data.DATA));
      }
      return data;
    });
};

export const loginSuccess = async () => {
  try {
    const config = {
      url: `${env.API_BASE_URL}`,
      method: "get",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    };

    const response = await axios(config);
    if (response.data?.DATA?.accessToken) {
      localStorage.setItem(TESCOM_USER_DATA, JSON.stringify(response.data.DATA));
    }
    return response.data;
  } catch (err) {
    return err;
  }
};

export const register = async (details: {
  phoneNumber: string;
  ogNumber: string;
  password: string;
  confirmPhoneNumber: string;
}) => {
  console.log(details.confirmPhoneNumber);
  const response = await axios.post(env.API_BASE_URL + `b/auth/local/signup`, details);
  return response.data;
};

export const confirmAccount = async (code: string, ogNumber: string) => {
  const respone = await axios.patch(env.API_BASE_URL + `/auth/local/account-activation`, {
    code,
    ogNumber
  });
  return respone.data;
};

export const resendConfirmationCode = async (ogNumber: string) => {
  const response = await axios.patch(env.API_BASE_URL + `/auth/local/resendConfirmAccountToken`, {
    ogNumber
  });
  return response.data;
};

export const logout = async () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    ...authHeader()
  };
  const configs = {
    headers,
    withCredentials: true
  };

  return await axios.get(`${env.API_BASE_URL}/${LOG_OUT}`, configs).finally(() => {
    localStorage.removeItem(TESCOM_USER_DATA);
    window.location.reload();
  });
};

export const forgotPassword = async (ogNumber: string) => {
  const response = await axios.post(`${env.API_BASE_URL}/${FORGOT_PASSWORD}`, ogNumber);
  return response.data;
};

export const resetPassword = async (password: string, token: string, ogNumber: string) => {
  const response = await axios.patch(`${env.API_BASE_URL}/${RESET_PASSWORD}`, {
    password,
    token,
    ogNumber
  });
  return response.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassord: string,
  confirmNewPassword: string
) => {
  const response = await axios.patch(`${env.API_BASE_URL}/${UPDATE_PASSWORD}`, {
    currentPassword,
    newPassord,
    confirmNewPassword
  });
  return response.data;
};
