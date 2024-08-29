import * as Yup from "yup";
import { useFormik } from "formik";
import LoginView from "./LoginView";
import { useAppDispatch, useAppSelector } from "hooks";
import { login, loginSuccess } from "../../redux/slices/auth.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ABOUT_ME } from "routes/CONSTANTS";
import { useEffect } from "react";

export const LoginContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.auth);

  const getAuthenticatedUser = async () => {
    dispatch(loginSuccess())
      .unwrap()
      .then((res) => {
        console.log("SUCCESSFULLY LOGGED IN");
        console.log(res)
        setTimeout(() => {
         toast.success(`Welcome ${res.user.user._doc.staffName.firstName}`)
        }, 5000);
        navigate(ABOUT_ME);
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          toast.error(err.message);
        }, 5000);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      
      navigate(ABOUT_ME);

   
    }
  }, [isLoggedIn]);

  const formik = useFormik({
    initialValues: {
      ogNumber: "",
      phoneNumber: "",
      password: ""
    },
    validationSchema: Yup.object().shape({
      ogNumber: Yup.string().required("OG-Number is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "kindly check the validity of your ogNumber and password again"
        )
    }),
    onSubmit: (details) => {
      dispatch(login({ ogNumber: details.ogNumber, password: details.password }))
        .unwrap()
        .then((res) => {
          console.log(res);
          setTimeout(() => {
          toast.success(`Welcome ${res.firstName}`);
        }, 5000);
          window.location.reload()
          getAuthenticatedUser().then(()=>{
          
            toast.success("logged in successfully")
       
          }).catch((error) =>{ toast.error(error)});
        })
        .catch((error) => {
          setTimeout(() => {
            toast.error(`Something went wrong! ${error}`);
          },1000);
        });
    }
  });

  return <LoginView formik={formik} loading={isLoading} />;
};
