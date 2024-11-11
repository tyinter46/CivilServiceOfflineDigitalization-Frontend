import { FC, useState, useEffect } from "react";
import { fetchSchools } from "../../services/schools.service";
import { ISchools, Settings } from "types";


import { toast } from "react-toastify";
import LogoLoader from "../../components/widgets/loader/Loader";
import ProfileUpdatePage from "./ProfileUpdateView";
import { useUpdateUserProfileMutation } from "../../services/users.service";
import { fetchUser } from "../../redux/slices/auth.slice";
import { useAppSelector, useAppDispatch } from "hooks";

export const ProfileUpdateViewContainer: FC = () => {
  const [schools, setSchools] = useState<ISchools[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updateUser, result] = useUpdateUserProfileMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user)
  const [userSaved, setUserSaved] = useState<any>(user);

  useEffect(() => {
    toast.success(result.data?.MESSAGE);
    toast.error(result.isError && "Something Went Wrong");
    // setLoading(result.isLoading);
  }, [result]);

  useEffect(() => {
    dispatch(fetchUser(user.user._doc._id))
      .unwrap()
      .then((res: any) => {
        console.log(res);
        console.log(user.user._doc._id)
        console.log(userSaved.user._doc._id)
        setUserSaved(user);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [dispatch]);

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
    void loadSchools();
  }, []); 

  if (loading) {
    return (
      <div>
        <LogoLoader />
      </div>
    );
  }
  const onSubmit = (details: Settings) => {
    console.log(details)
    console.log(user.user._doc._id)
     void updateUser({ id: user.user._doc._id, details });
  };

  if (error) return <div>{error}</div>;

  return <ProfileUpdatePage onSubmit={onSubmit} userDetails = {user} schools = {schools} />;
  // return <ProfileUpdatePage schools={schools} create={create} />;
};
