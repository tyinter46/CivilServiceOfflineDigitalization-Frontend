import env from "configs";
import axios from "axios";
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${env.API_BASE_URL}${`/users`}`);
    console.log(response)
    const fetchedData = response.data.DATA.users.users
    // const users = fetchedData.DATA.users.users;
    console.log(response)
    if (!response) {
      throw new Error("Network response was not ok");
    }
    return fetchedData;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUser = async (id: any) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}${`/user/${id}`}`);
    const fetchedData = await response.json();
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
