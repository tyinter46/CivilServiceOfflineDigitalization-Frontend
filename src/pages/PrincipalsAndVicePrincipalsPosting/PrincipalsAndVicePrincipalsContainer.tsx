import { FC, useState, useEffect, useCallback } from "react";
import { PrincipalsAndVicePrincipalsView } from "./PrincipalsAndVicePrincipalsView";
import { fetchSchools } from "../../services/schools.service";
import { fetchUsers } from "../../services/users.service";
import { ISchools, IUser } from "types";
import { toast } from "react-toastify";
import LogoLoader from "../../components/widgets/loader/Loader";

export const PrincipalsAndVicePrincipalsContainer: FC = () => {
  const [schools, setSchools] = useState<ISchools[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSchools = async () => {
    try {
      const fetchedSchools = await fetchSchools();
      setSchools(fetchedSchools);
    } catch (error) {
      toast.error("Failed to fetch schools");
      setError("Failed to fetch schools");
    }
  };

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      toast.error("Failed to fetch users");
      setError("Failed to fetch users");
      console.log(error);
    }
  };

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      // Load both schools and users concurrently, and handle any errors
      await loadSchools()
      await loadUsers();
    } catch (error) {
      console.error("Error loading data:", error); // Log error for production debugging
      // Optionally set an error state here if you have one, e.g., setError(true)
    } finally {
      // Ensure loading state is reset, even if an error occurs
      setLoading(false);
    }
  }, []);
  
  // useEffect will trigger the data refresh when the component mounts
  useEffect(() => {
    void refreshData(); // Immediately invoke the refresh function
  }, [refreshData]);

  if (loading)
    return (
      <div>
        <LogoLoader />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <PrincipalsAndVicePrincipalsView schools={schools} staff={users} refreshData={refreshData} />
  );
};
