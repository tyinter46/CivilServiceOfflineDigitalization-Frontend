import { useAppSelector } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

interface INavigate {
  navigate: string;
}


const ProtectedAdminRoute = ({ navigate }: INavigate) => {
    const { isLoggedIn, isAdmin } = useAppSelector((state) =>  state.auth);
    console.log(isLoggedIn, isAdmin)
    return (isAdmin && isLoggedIn) ? <Outlet /> : <Navigate to={navigate} replace />;
  };
  

  export default ProtectedAdminRoute;