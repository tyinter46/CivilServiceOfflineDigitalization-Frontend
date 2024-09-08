import * as Yup from "yup";
import { useFormik } from "formik";
// import { useState } from "react";
import { toast } from "react-toastify";
import { setOgNumber } from "../../redux/slices/ogNumber.slice";
import { CONFIRM_ACCOUNT, SIGNUP } from "routes/CONSTANTS";
import { Auth } from "components";
import { signup } from "../../redux/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "hooks";

import SignupView from "./SignUpView";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { maskPhoneNumber } from "utils/maskPhoneNumber";

export const SignupContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, [dispatch]);
  const { isLoading } = useAppSelector((state) => state.auth);
  // const [isVerifying, setIsVerifying] = useState(false);
  // let { isVerifying } = useAppSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      ogNumber: "",
      password: "",
      phoneNumber: "",
      confirmPhoneNumber: ""
    },
    validationSchema: Yup.object().shape({
      ogNumber: Yup.string()
        .required("OG-Number is required.")
        .min(4, "OG-Number should be at least 4 characters")
        .max(7, "OG-Number should not be more than 7 characters"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Weak Password. Password must have at least: 1 upper case, 1 digit, 1 special character, Minimum eight in length"
        ),
      phoneNumber: Yup.string()
        .required("Phone Number is Required")
        .min(18, "Phone Number Length Incomplete"),
      confirmPhoneNumber: Yup.string()
        .oneOf([Yup.ref("phoneNumber")], "Does not match with the phone number")
        .required("Confirm Phone Number is Required")
    }),

    onSubmit: (details) => {
      console.log("is verifying", details);
      void dispatch(setOgNumber(String(details.ogNumber)));
      void dispatch(
        signup({
          ogNumber: details.ogNumber,
          password: details.password,
          phoneNumber: details.phoneNumber,
          confirmPhoneNumber: details.confirmPhoneNumber
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          const phoneNumber = maskPhoneNumber(details.phoneNumber);
          // console.log(res.newUser.staffName.firstName)
          console.log(phoneNumber);
          setTimeout(() => {
            toast.success(
              `${res.name} Verification code has been sent to this phone number "${phoneNumber}", kindly input the code for verification`
            );
          }, 5000);
          // isVerifying = true;
          navigate(CONFIRM_ACCOUNT);
        })
        .catch((error: any) => {
          console.log(error.message);
          if (
            error.message ===
              "An Account Already Exist with this details kindly verify your account" ||
            error.message ===
              " You previously created an account, kindly login or Reset your password"
          ) {
            navigate(SIGNUP);
            window.location.reload();
          }
          setTimeout(() => {
            toast.error(` "${error.message}",  `);
          }, 5000);
        });
    }
  });

  return (
    <Auth>
      <SignupView formik={formik} loading={isLoading} />
    </Auth>
  );
};
