import { FC, useState, useEffect } from "react";
import { PrincipalsAndVicePrincipalsView } from "./PrincipalsAndVicePrincipalsView";
import { fetchSchools } from "../../services/schools.service";
import { fetchUsers } from "../../services/users.service";
import { ISchools, IUser } from "types";
import { toast } from "react-toastify";

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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([loadSchools(), loadUsers()]);
      setLoading(false);
    };
    void fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PrincipalsAndVicePrincipalsView
      schools={schools}
      staff={users}
    />
  );
};
