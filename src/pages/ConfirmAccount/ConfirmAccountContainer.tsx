import * as Yup from "yup";
import { useFormik } from "formik";
import ConfirmAccountView from "./ConfirmAccountView";
import { useAppSelector, useAppDispatch } from "hooks";
import { resendConfirmAccountTokenSlice } from "../../redux/slices/auth.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CONFIRM_ACCOUNT } from "routes/CONSTANTS";
import { maskPhoneNumber } from "utils/maskPhoneNumber";

export const ConfirmAccountContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      ogNumber: ""
    },

    validationSchema: Yup.object().shape({
      ogNumber: Yup.string()
        .required("OG-Number is required.")
        .min(4, "OG-Number should be at least 4 characters")
        .max(7, "OG-Number should not be more than 7 characters")
    }),

    onSubmit: (details) => {
      // console.log(details.ogNumber)
      dispatch(resendConfirmAccountTokenSlice({ ogNumber: details.ogNumber }))
        .unwrap()
        .then((res) => {
          setTimeout(() => {
            toast.success(
              `${res.firstName}, code has been resent to ${maskPhoneNumber(res.phoneNumber)}`
            );
            navigate(CONFIRM_ACCOUNT);
          }, 5000);
        })
        .catch((error) => {
          // console.log(error.message);
          // console.log(details.ogNumber);
          setTimeout(() => {
            toast.error(`${error.message}`);
          }, 5000);
        });
    }
  });

  return (
    <div>
      <ConfirmAccountView loading={isLoading} formik={formik}>
        {" "}
      </ConfirmAccountView>
    </div>
  );
};
