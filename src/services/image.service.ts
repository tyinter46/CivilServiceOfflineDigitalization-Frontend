import axios from "axios";
import FormData from "form-data";
import { baseImageApi } from "./api";
import env from "configs";
import { IMAGE_TAG, UPLOAD_IMAGE } from "./CONSTANTS";
import { imageResponse } from "types";

export const uploadImage = async (image: any) => {
  const formData = new FormData();
  formData.append("image", image.image);
  const response = await axios.post(`${env.API_BASE_URL}${UPLOAD_IMAGE}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const imageApi = baseImageApi.injectEndpoints({
  endpoints: (builder) => ({
    getImage: builder.query<imageResponse, string>({
      providesTags: [IMAGE_TAG],
      query: (id) => `${UPLOAD_IMAGE}/${id}`
    }),

    updateUserImage: builder.mutation<imageResponse, { id: string; image: File }>({
      query: ({ id, image }) => {
        const formData = new FormData();
        formData.append("image", image);

        return {
          url: `${UPLOAD_IMAGE}/${id}`,
          method: "PATCH",
          body: formData
        };
      },
      invalidatesTags: [IMAGE_TAG]
    }),
    uploadImage: builder.mutation<imageResponse, { image: File }>({
      query: (image) => {
        const formData = new FormData();
        formData.append("image", image);
        return {
          url: `${UPLOAD_IMAGE}`,
          method: "POST",
          body: formData
        };
      },
      invalidatesTags: [IMAGE_TAG]
    })
  })
});

// export const {useGetImageQuery, useUpdateUserImageMutation, useUploadImageMutation } = imageApi

export const updateImage = async (id: string, image: any) => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await axios.patch(`${env.API_BASE_URL}${UPLOAD_IMAGE}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const deleteImage = async (id: string) => {
  const response = await axios.delete(`${env.API_BASE_URL}${UPLOAD_IMAGE}/${id}`);
  return response.data;
};
