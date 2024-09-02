import env from "configs";

import { toast } from "react-toastify";

export const fetchPostingReport = async () => {
  try {
    const response = await fetch(`${env.API_BASE_URL}${`/postingReport`}`);
    const fetchedData = await response.json();
    const schools = fetchedData.DATA.programs;

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    toast.success("Posting reporting fetched successfully");
    return schools;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};
