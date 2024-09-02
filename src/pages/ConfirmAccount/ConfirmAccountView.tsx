/* eslint-disable no-undef */
import PinInput from "react-pin-input";
import Navbar from "components/modules/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "hooks";
import { toast } from "react-toastify";
import { confirmAccount, resendConfirmAccountTokenSlice } from "../../redux/slices/auth.slice";
import { LOGIN } from "routes/CONSTANTS";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { FormikProps } from "formik";
import { ReactNode } from "react";
import { Button, Loader, FormInput } from "components";
import { maskPhoneNumber } from "utils/maskPhoneNumber";

interface Props {
  loading: boolean;
  formik: FormikProps<{
    ogNumber: string;
  }>;
  children?: ReactNode;
}

const ConfirmAccountView: React.FC<Props> = ({ loading, formik }) => {
  const dispatch = useAppDispatch();
  const ogNumber = useAppSelector((state: RootState) => state.ogNumber.ogNumber);
  const existingAccountOgNumber = formik.values.ogNumber;
  const navigate = useNavigate();
  const isLoading = loading;

  const onComplete = (value: string) => {
    let assignedOgNumber: string;
    if (ogNumber === "") {
      assignedOgNumber = existingAccountOgNumber;
    } else {
      assignedOgNumber = ogNumber;
    }
    dispatch(confirmAccount({ code: value, ogNumber: assignedOgNumber }))
      .unwrap()
      .then((res) => {
        toast.success(`${res.firstName} has been successfully verified, kindly login`);
        navigate(LOGIN);
      })
      .catch((error: any) => {
        toast.error(`${error.message}`);
      });
  };

  const resendCode = (ogNumber: string) => {
    dispatch(resendConfirmAccountTokenSlice({ ogNumber }))
      .unwrap()
      .then((res) => {
        // const phoneNumber = res.phoneNumber
        // phoneNumber.toString().replace()

        toast.success(
          `${res.firstName}, code has been resent to ${maskPhoneNumber(res.phoneNumber)}`
        );
        // navigate(CONFIRM_ACCOUNT)
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  if (ogNumber === "") {
    return isLoading ? (
      <LoadingScreen />
    ) : (
      <>
        <Navbar />
        <div className="bg-black min-h-screen flex flex-col items-center justify-center">
          <form onSubmit={formik.handleSubmit} className="space-y-5 w-full max-w-md">
            <div className="gap-4">
              <label htmlFor="ogNumber" className="block text-lg text-yellow-300"></label>
              <FormInput
                required
                size="lg"
                type="text"
                className="text-white text-lg bg-gray-800 border-b border-green-500"
                id="ogNumber"
                name="ogNumber"
                label="Your OG-Number"
                placeholder="OG-number"
                errors={formik.errors.ogNumber}
                touched={formik.touched.ogNumber}
                onChange={formik.handleChange}
              />
            </div>

            <div className="mt-10">
              <Button
                size="lg"
                type="submit"
                className="w-full text-black flex items-center bg-green justify-center mt-4 hover:bg-[#50c878] hover:text-white"
              >
                {loading ? <Loader /> : "Send Code"}
              </Button>
            </div>
          </form>
          <div className="mt-10">
            <PinInput
              length={6}
              initialValue=""
              secret={false}
              onChange={(value, index) => {
                console.log(value, index);
              }}
              type="numeric"
              inputMode="number"
              style={{ padding: "20px", alignSelf: "center", border: 5 }}
              inputStyle={{ borderColor: "green", backgroundColor: "black", color: "white" }}
              inputFocusStyle={{ borderColor: "yellow" }}
              onComplete={(value) => {
                onComplete(value);
              }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
          </div>
          <p className="text-green ">
            Didn't receive code? click
            <span
              className="text-yellow cursor-pointer"
              onClick={() => {
                resendCode(existingAccountOgNumber);
              }}
            >
              <strong> here </strong>
            </span>
            to resend
          </p>
        </div>
      </>
    );
  } else {
    return isLoading ? (
      <LoadingScreen />
    ) : (
      <>
        <Navbar />
        <div className="bg-black min-h-screen flex flex-col items-center justify-center">
          <div className="mt-10">
            <PinInput
              length={6}
              initialValue=""
              secret={false}
              onChange={(value, index) => {
                console.log(value, index);
              }}
              type="numeric"
              inputMode="number"
              style={{ padding: "20px", alignSelf: "center", border: 5 }}
              inputStyle={{ borderColor: "green", backgroundColor: "black", color: "white" }}
              inputFocusStyle={{ borderColor: "yellow" }}
              onComplete={(value) => {
                onComplete(value);
              }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
          </div>
          <p className="text-green ">
            Didn't receive code? click
            <span
              className="text-yellow cursor-pointer"
              onClick={() => {
                resendCode(ogNumber);
              }}
            >
              <strong> here </strong>
            </span>
            to resend
          </p>
        </div>
      </>
    );
  }
};

const LoadingScreen = () => (
  <>
    <Navbar />
    <div className="flex-col items-center mt-10">
      <h1>Loading</h1>
    </div>
  </>
);

export default ConfirmAccountView;
