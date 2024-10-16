import env from "configs";
import axios from "axios";
import { toast } from "react-toastify";
// import { SCHOOL } from "routes/CONSTANTS";

export const fetchSchools = async () => {
  try {
    const response = await axios.get(`${env.API_BASE_URL}${`/schools`}`);
    console.log(response);
    const fetchedData = response.data.DATA.programs;
    const schools = fetchedData;
    console.log(fetchedData);
    if (!response) {
      throw new Error("Network response was not ok");
    }
    return schools;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};

export const fetchUsersFromAparticularSchool = async (id: string) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}${`/schools/users/${id}`}`);
    const fetchedData = await response.json();
    const usersFromSchool = fetchedData.DATA;
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return usersFromSchool;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};
export const postPrincipalsAndVicePrincipals = async ({
  previousSchool,
  staleOrNew,
  principal,
  vicePrincipalAdmin,
  vicePrincipalAcademics,
  schoolId
}: {
  previousSchool: string;
  staleOrNew: string;
  principal: string;
  vicePrincipalAdmin: string;
  vicePrincipalAcademics: string;
  schoolId: string;
}) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true
  };

  const configs = {
    headers,
    withCredentials: true
  };

  const payload = {
    previousSchoolId: previousSchool.toString(),
    staleOrNew: staleOrNew.toString(),
    principal: principal.toString(),
    vicePrincipalAdmin: vicePrincipalAdmin.toString(),
    vicePrincipalAcademics: vicePrincipalAcademics.toString()
  };

  console.log("Payload:", payload);

  try {
    const response = await axios.patch(`${env.API_BASE_URL}/schools/${schoolId}`, payload, configs);
    console.log(response);
    return toast.success(response.data.message);
    // return response.data.message;
  } catch (error: any) {
    console.error("Error posting staff:", error);
    toast.error(error.message || "An error occurred while posting staff.");
    throw error; // Ensure any errors are thrown for proper handling
  }
};
