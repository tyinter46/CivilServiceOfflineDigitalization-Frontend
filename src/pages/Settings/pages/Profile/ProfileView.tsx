/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Input, Loader, Navbar } from "components";
import { SvgTesMessageSquareEdit, TesCheckedboxMarkedCircle } from "components/icons";
import { user } from "assets/images";
import { Link} from "react-router-dom";
import { UPDATE_PROFILE } from "routes/CONSTANTS";
import React from "react";

import { UserDetails } from "types";
import { Formik } from "formik";
import { downloadLogo } from "assets/logos";
import LogoLoader from "components/widgets/loader/LogoLoader";

import * as Yup from "yup";
// import { Link } from "react-router-dom";

// type ModalId = string | null;
interface Props {
  loading: boolean;
  
  userDetails: UserDetails;
  image: string;
  pictureUpload: (event: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}


const validationSchema = Yup.object().shape({
  file: Yup.mixed().required("File is required"),
});

function ProfileView({ loading, userDetails, pictureUpload }: Props) {
 

 



  const postingLetterUrl = userDetails?.letters;

  console.log(postingLetterUrl);
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {loading ? (
        <LogoLoader />
      ) : (
        <div className="mt-6 p-6 bg-white-700 rounded-lg shadow-md">
          <Formik
            initialValues={{ file: null }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (values.file) {
                  await pictureUpload(values.file);
                  alert("Upload successful!");
                }
              } catch {
                alert("Upload failed!");
              } finally {
                setSubmitting(false);
              }
            }}
            enableReinitialize
            validationSchema={validationSchema}
          >
            <div className="relative flex justify-center mt-10 overflow-hidden">
              <div className="relative flex items-center flex-col mb-6 w-32 h-32">
                <div className="relative shadow rounded-full w-full h-full">
                  <img
                    src={user}
                    alt="Profile"
                    className="shadow rounded-full w-full h-full border-2 border-yellow-500"
                  />
                  <div className="absolute right-0 bottom-0 bg-green-700 p-1 rounded-full">
                    <TesCheckedboxMarkedCircle color="yellow" width="25px" height="25px" />
                  </div>
                </div>
                <Input
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                  type="file"
                  name="select-photo"
                  id="select-photo"
                  onChange={pictureUpload}
                  accept="image/png, image/jpeg, image/jpg"
                />
                <div className="flex items-center space-x-2 mt-2">
                  <SvgTesMessageSquareEdit color="yellow" />
                  <label
                    htmlFor="select-photo"
                    className="text-sm font-medium text-yellow-500 cursor-pointer"
                  >
                    Change Photo
                  </label>
                </div>
              </div>
            </div>
          </Formik>
          <div className="flex flex-col h-full p-4 bg-green-800 border-color-white border-2 rounded-md shadow-md mb-6">
            <div className="relative flex flex-col justify-center items-center">
             

              {postingLetterUrl ? (<>
                 <h5 className="text-red-100">Click Here to Download Your Letter</h5>
                <a href={postingLetterUrl} download>
                  <div className=" flex justify-center items-center shadow rounded-full w-[80px] h-[80px] bg-green">
                    <img src={downloadLogo} alt="Click Here To Download" className="h-10 w-10" />
                  </div>
                </a>
                </>
              ) : (
                "No posting letter available yet"
              )}

        
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Full Name</div>
                <span className="text-lg">{userDetails.staffName}</span>
              </div>
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">
                  Date of First Appointment
                </div>
                <span className="text-lg">{userDetails.dateOfFirstAppointment}</span>
              </div>
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Phone Number</div>
                <span className="text-lg">{userDetails?.phoneNumber || "-"}</span>
              </div>
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">OG Number</div>
                <span className="text-lg">{userDetails?.ogNumber}</span>
              </div>
            </div>

            </div>
          <div className="p-4 bg-green-800  border-color-white border-2  rounded-md shadow-md mb-6">
            <div className="flex flex-col sm:flex-row">
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Address</div>
                <span className="text-lg">{userDetails?.residentialAddress || "-"}</span>
              </div>
             
            
            </div>
            
            <div className="flex flex-col sm:flex-row">
             
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Nationality</div>
                <span className="text-lg">{userDetails?.nationality || "-"}</span>
              </div>
          
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">State</div>
                <span className="text-lg">{userDetails?.stateOfOrigin || "-"}</span>
              </div>
            
            </div>
          </div>

          <div className="p-4 bg-green-800  border-color-white border-2  rounded-md shadow-md mb-6">
            <div className="flex flex-col sm:flex-row">
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">School of Previous Posting</div>
                <span className="text-lg">{userDetails?.schoolOfPreviousPosting || "-"}</span>
              </div>
             
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">School of Present Posting</div>
                <span className="text-lg">{userDetails?.schoolOfPresentPosting || "-"}</span>
              </div>
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Zone</div>
                <span className="text-lg">{userDetails?.zone || "-"}</span>
              </div>
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Division</div>
                <span className="text-lg">{userDetails?.division || "-"}</span>
              </div>
            </div>
            
          
          </div>


          <div className="p-4 bg-green-800  border-color-white border-2  rounded-md shadow-md mb-6 flex flex-col sm:flex-row">
            
            <div className="p-2 flex-1">
              <div className="text-md font-semibold text-yellow-500">Email Address</div>
              <span className="text-lg">{userDetails?.email || "-"}</span>
            </div>
          </div>
          <div className="p-4 bg-green-800  border-color-white border-2  rounded-md shadow-md mb-6 flex flex-col sm:flex-row">
            <div className="p-2 flex-1">
              <div className="text-md font-semibold text-yellow-500">File Number</div>
              <span className="text-lg">{userDetails?.tscFileNumber || "-"}</span>
            </div>
            <div className="p-2 flex-1">
              <div className="text-md font-semibold text-yellow-500">Cadre</div>
              <span className="text-lg">{userDetails?.cadre || "-"}</span>
            </div>
          </div>
          <Link to={UPDATE_PROFILE}> <div className="w-full h-full text-xl bg-yellow-600 text-center justify-end">
           
             {loading ? <Loader /> : "Edit"} 
          
          </div>
          </Link>
        </div>
      )}
   
    </div>
  );
}

export default ProfileView;
