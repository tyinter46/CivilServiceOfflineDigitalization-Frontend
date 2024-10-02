import * as Yup from "yup";
import { useFormik } from "formik";
import ForgotPasswordView from "./ForgotPasswordView";
import { useAppSelector, useAppDispatch } from "hooks";
import {  resetPassword } from "../../redux/slices/auth.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {  LOGIN } from "routes/CONSTANTS";


export const ForgotPasswordContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      ogNumber: "",
      phoneNumber: "",
      password: "",          
      confirmPassword: ""    
    },
  
    validationSchema: Yup.object().shape({
      ogNumber: Yup.string()
        .required("OG-Number is required")
        .min(7, "OG Number must be 7 characters in length")
        .matches(
          /^(OG|og)[0-9]{1,5}$/,
          "OG-Number must start with OG or og along with 5 digits"
        ),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Weak Password. Password must have at least: 1 upper case, 1 digit, 1 special character, Minimum eight in length"
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref('password')], 'Passwords must match'),
      phoneNumber: Yup.string()
        .required("Phone Number is Required")
        .min(18, "Phone Number Length Incomplete"),
    }),
  
    onSubmit: (details) => {
      // console.log(details.ogNumber)
      dispatch(resetPassword({ ogNumber: details.ogNumber,
        phoneNumber: details.phoneNumber,
        password: details.password
       }))
        .unwrap()
        .then((res) => {
                    toast.success(
              `${res.name}, passsword changed successfully`
            );
            navigate(LOGIN);
               })
        .catch((error) => {
          console.log(error);
          console.log(details.ogNumber);
          setTimeout(() => {
            toast.error(`${error}`);
          }, 5000);
        });
    }
  });
  
  return (
    <div>
      <ForgotPasswordView loading={isLoading} formik={formik}>
      
      </ForgotPasswordView>
    </div>
  );
};
