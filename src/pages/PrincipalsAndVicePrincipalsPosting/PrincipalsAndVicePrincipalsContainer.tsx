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
    await Promise.all([loadSchools(), loadUsers()]);
    setLoading(false);
  }, []);

  useEffect(() => {
  void  refreshData().then(() => {});
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
