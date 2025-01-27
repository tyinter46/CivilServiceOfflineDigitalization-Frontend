import { FC, useState, useEffect } from "react";
import { fetchSchools } from "../../services/schools.service";
import { ISchools, Settings } from "types";
import { ABOUT_ME } from "routes/CONSTANTS";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import ProfileUpdatePage from "./ProfileUpdateView";
import { useUpdateUserProfileMutation } from "../../services/users.service";
import { fetchUser } from "../../redux/slices/auth.slice";
// import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch,  } from "hooks";
import LogoLoader from "../../components/widgets/loader/LogoLoader";

export const ProfileUpdateViewContainer: FC = () => {
  const [schools, setSchools] = useState<ISchools[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updateUser, result] = useUpdateUserProfileMutation();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  console.log(user)
  const [userSaved, setUserSaved] = useState<any>(user);

  useEffect(() => {
    
    toast.success(result.data?.MESSAGE);
    console.log(result.data?.MESSAGE)
    toast.error(result.isError && result.data?.MESSAGE);

    // setLoading(result.isLoading);
  }, [result]);

  useEffect(() => {
    dispatch(fetchUser(user?.user?._id))
      .unwrap()
      .then((res: any) => {
         console.log(res);
        // console.log(user.user._doc._id)
        console.log(userSaved?.user?._id)
        setUserSaved(user);
      })
      .catch((err: any) => {
        // toast.error(err)
        console.log(err);
      });
  }, [dispatch]);

  const loadSchools = async () => {
    
    try {
      setLoading(true)
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


  const onSubmit = async (details: Settings) => {
    console.log(details)
    console.log(user.user._id)
     void updateUser({ id: user.user._id, details });
     const updatedUser = await updateUser({ id: user.user._id, details });
     console.log(updatedUser)
  if (error) toast.error(error)
    else {
 
      setTimeout(()=> {
        // window.location.href = ABOUT_ME
        navigate(ABOUT_ME, { state: { user: updatedUser} });
       
      
      }, 3000)
     
    }
  };

  if (error) return <div>{error}</div>;

  return loading ? <LogoLoader /> : <ProfileUpdatePage onSubmit={onSubmit} userDetails = {user} schools = {schools} />
  // return <ProfileUpdatePage schools={schools} create={create} />;
};
