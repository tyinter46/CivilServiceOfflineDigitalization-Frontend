import { FC, useState, useEffect } from "react";
import { fetchSchools } from "../../services/schools.service";
import { ISchools } from "types";
import { toast } from "react-toastify";
import LogoLoader from "../../components/widgets/loader/Loader";
import ProfileUpdatePage from "./ProfileUpdateView";


export const ProfileUpdateViewContainer: FC = () => {
  const [schools, setSchools] = useState<ISchools[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSchools = async () => {
    try {
      const fetchedSchools = await fetchSchools();
      setSchools(fetchedSchools);
    } catch (error) {
      toast.error("Failed to fetch schools");
      setError("Failed to fetch schools");
    } finally {
      setLoading(false); // Ensure loading is turned off after the fetch
    }
  };

  useEffect(() => {
   void  loadSchools();
  }, []); // Removed loadSchools from dependency to avoid endless loop

  if (loading) {
    return (
      <div>
        <LogoLoader />
      </div>
    );
  }

  if (error) return <div>{error}</div>;
 
  return <ProfileUpdatePage schools={schools}  />;
};
