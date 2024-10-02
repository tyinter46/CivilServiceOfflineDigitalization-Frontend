/* eslint-disable no-undef */
import Navbar from "components/modules/navbar/Navbar";
// import { useAppDispatch} from "hooks";
// import { toast } from "react-toastify";
// import { resetPassword } from "../../redux/slices/auth.slice";
// import { LOGIN } from "routes/CONSTANTS";
// import { useNavigate } from "react-router-dom";
// import { RootState } from "../../redux/store";
import LogoLoader from "components/widgets/loader/LogoLoader";
import { FormikProps } from "formik";
// import { ReactNode } from "react";
import { Button, Loader, FormInput } from "components";


interface Props {
  loading: boolean;
  formik: FormikProps<{
    ogNumber: string;
    phoneNumber: string;
    password: string
    confirmPassword: string
  }>
}

const ForgotPasswordView: React.FC<Props> = ({ loading, formik }) => {
  // const dispatch = useAppDispatch();
  // const ogNumber = useAppSelector((state: RootState) => state.ogNumber.ogNumber);
  // const existingAccountOgNumber = formik.values.ogNumber;
  // const navigate = useNavigate();
  const isLoading = loading;


  // const changePassword = (ogNumber: string, phoneNumber: string, password: string) => {
  //   dispatch(resetPassword({ogNumber , phoneNumber, password}))
  //     .unwrap()
  //     .then((res) => {
  //       // const phoneNumber = res.phoneNumber
  //       // phoneNumber.toString().replace()

  //       toast.success(
  //         `${res.name}, password successfully changed)}`
  //       );
  //        navigate(LOGIN)
  //     })
  //     .catch((error) => {
  //       toast.error(`${error.message}`);
  //     });
  // };

  const LoadingScreen = () => (
    <>
      <Navbar />
      <div className="flex-col items-center mt-10">
        <LogoLoader></LogoLoader>
      </div>
    </>
  );
return (
  isLoading ? (
      <LoadingScreen />
    ) : (
      <>
        <Navbar />
        <div className="bg-black min-h-screen flex flex-col items-center justify-center mt-10">
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
            <div className="gap-4">
            <FormInput
              required
              size="lg"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              errors={formik.errors.phoneNumber}
               touched={formik.touched.phoneNumber}
              onChange={formik.handleChange}
              className="text-white text-lg bg-gray"
            />
            
            <FormInput
              required
              size="lg"
              type="password"
              id="password"
              name="password"
              maxLength={15}
              label="Create new password"
              placeholder="Enter password"
              errors={formik.errors.password}
              touched={formik.touched.password}
              onChange={formik.handleChange}
              className="text-white text-lg bg-gray"
            />
           < FormInput
              required
              size="lg"
              type="password"
              id="password"
              name="confirmPassword"
              label="Confirm password"
              placeholder="Confirm password"
              errors={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
              onChange={formik.handleChange}
              className="text-black bg-white"
            />
             </div>
            <div className="mt-10">
              <Button
                size="lg"
                type="submit"
                className="w-full text-black flex items-center bg-green justify-center mt-4 hover:bg-[#50c878] hover:text-white"
              >
                {loading ? <Loader /> : "Submit"}
              </Button>
            </div>
          </form>
          <div className="mt-10">
           
          </div>
         
        </div>
      </>
    )
  )
 
}



export default ForgotPasswordView
