import env from "configs";
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${env.API_BASE_URL}${`/users`}`);
    const fetchedData = await response.json();
    const users = fetchedData.DATA.users.users;

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return users;
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
