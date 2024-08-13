import env from "configs";

// import { SCHOOL } from "routes/CONSTANTS";

export const fetchSchools = async () => {
  try {
    const response = await fetch(`${env.API_BASE_URL}${`/schools`}`);
    const fetchedData = await response.json();
    const schools = fetchedData.DATA.programs;

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return schools;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};
