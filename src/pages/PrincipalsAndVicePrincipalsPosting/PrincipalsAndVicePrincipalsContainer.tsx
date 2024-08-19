import { PrincipalsAndVicePrincipalsView } from "./PrincipalsAndVicePrincipalsView";
import { FC, useState, useEffect } from "react";
import { fetchSchools  } from "../../services/schools.service";
import { ISchools, IUser } from "types";
import { toast } from "react-toastify";
import { fetchUsers } from "../../services/users.service";

export const PrincipalsAndVicePrincipalsContainer: FC = ()=>{
    const [schools, setSchools] = useState<ISchools[]>([]);

    const [users, setUsers] = useState<IUser[]>([]);
    // const [error, setError] = useState<string | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const loadSchools = async () => {
          try {
            const fetchedSchools = await fetchSchools();
            setSchools(fetchedSchools);
          } catch (error) {
          toast.error("Failed to fetch schools");
          } 
        };
        const loadUsers = async ()=>{
          try {
            const fetchedUsers = await fetchUsers()
            setUsers(fetchedUsers)
            console.log(fetchedUsers)
          } catch (error) {
            toast.error('Failed to fetch users')
          }
        }
        void loadUsers()
        void loadSchools();
      }, []);
    

      const onSubmit = ()=>{
        console.log("submitted")
      }
    
    return <PrincipalsAndVicePrincipalsView schools = {schools} staff = {users} onSubmit={onSubmit} />
}