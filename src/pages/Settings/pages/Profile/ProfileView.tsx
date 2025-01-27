/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Input, Loader, Navbar } from "components";
import { SvgTesMessageSquareEdit, TesCheckedboxMarkedCircle } from "components/icons";
 import { user } from "assets/images";
// import { Link } from "react-router-dom";
// import { UPDATE_PROFILE } from "routes/CONSTANTS";
import React from "react";

import { UserDetails } from "types";
import { Formik } from "formik";
import { downloadLogo } from "assets/logos";
import LogoLoader from "components/widgets/loader/LogoLoader";

import * as Yup from "yup";
// import { School } from "pages";
// import { Link } from "react-router-dom";

// type ModalId = string | null;
interface Props {
  loading: boolean;

  userDetails: UserDetails;
  image: string;
  pictureUpload: (event: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
}

const validationSchema = Yup.object().shape({
  file: Yup.mixed().required("File is required")
});

function ProfileView({ loading, userDetails, pictureUpload, image }: Props) {
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
            {/* "http://res.cloudinary.com/dhkhxaxca/image/upload/v1737545792/fewte31ad6al2pnjq15v.png"  */}
            <div className="relative flex justify-center mt-10 overflow-hidden">
              <div className="relative flex items-center flex-col mb-6 w-32 h-32">
                <div className="relative shadow rounded-full w-full h-full">
                  <img
                    src={image || user}
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
              {postingLetterUrl ? (
                <>
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
                <div className="text-md font-semibold text-yellow-500">Grade Level</div>
                <span className="text-lg">{userDetails?.gradeLevel || "-"}</span>
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
                <div className="text-md font-semibold text-yellow-500">File Number</div>
                <span className="text-lg">{userDetails?.tscFileNumber || "-"}</span>
              </div>
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Staff Type</div>
                <span className="text-lg">{userDetails?.staffType || "-"}</span>
              </div>
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Cadre</div>
                <span className="text-lg">{userDetails?.cadre || "-"}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-800  border-color-white border-2  rounded-md shadow-md mb-6">
            <div className="flex flex-col sm:flex-row">
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Phone Number</div>
                <span className="text-lg">{userDetails?.phoneNumber || "-"}</span>
              </div>
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">Nationality</div>
                <span className="text-lg">{userDetails?.nationality || "-"}</span>
              </div>

              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">State of Origin </div>
                <span className="text-lg">{userDetails?.stateOfOrigin || "-"}</span>
              </div>

              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">
                  Local Government ogf Origin
                </div>
                <span className="text-lg">{userDetails?.lgOfOrigin || "-"}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-800  border-color-white border-2  rounded-md shadow-md mb-6">
            <div className="flex flex-col sm:flex-row">
              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">
                  School of Previous Posting
                </div>
                <span className="text-lg">{userDetails?.schoolOfPreviousPosting || "-"}</span>
              </div>

              <div className="p-2 flex-1">
                <div className="text-md font-semibold text-yellow-500">
                  School of Present Posting
                </div>
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

          <div className="p-4 bg-green-800  border-color-white border-2  rounded-md shadow-md mb-6">
          <div className="p-2 flex-1">
              <div className="text-md font-semibold text-yellow-500 mb-4">Subjects Assigned</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userDetails?.subjectsTaught?.length > 0 ? (
                  userDetails?.subjectsTaught?.map((subject, index) => (
                    <div
                      key={index}
                      className="p-4 bg-green-900 rounded-md shadow-sm border border-yellow-500"
                    >
                      <div className="text-sm text-white-400">
                        <span className="font-semibold text-yellow-400">Subject</span>{" "}
                        {subject || "-"}
                      </div>
                      
                    </div>
                  ))
                ) : (
                  <span className="text-yellow-300">No school records available</span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-800  border-color-white border-2  rounded-md shadow-md mb-6 flex flex-col sm:flex-row">
            <div className="p-2 flex-1">
              <div className="text-md font-semibold text-yellow-500">Email Address</div>
              <span className="text-lg">{userDetails?.email || "-"}</span>
            </div>
            <div className="p-2 flex-1">
              <div className="text-md font-semibold text-yellow-500">Address</div>
              <span className="text-lg">{userDetails?.residentialAddress || "-"}</span>
            </div>
          </div>

          <div className="p-4 bg-green-800 border-white border-2 rounded-md shadow-md mb-6 flex flex-col sm:flex-row">
            {/* Email Address Section */}
            <div className="p-2 flex-1">
              <div className="text-md font-semibold text-yellow-500 mb-4">School Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userDetails?.qualifications?.length > 0 ? (
                  userDetails?.qualifications?.map((schoolDetail, index) => (
                    <div
                      key={index}
                      className="p-4 bg-green-900 rounded-md shadow-sm border border-yellow-500"
                    >
                      <div className="text-sm text-white-400">
                        <span className="font-semibold text-yellow-400">School Name:</span>{" "}
                        {schoolDetail?.schoolName || "-"}
                      </div>
                      <div className="text-sm text-white-400">
                        <span className="font-semibold font-semibold text-yellow-400">Specialization:</span>{" "}
                        {schoolDetail?.specialization || "-"}
                      </div>
                      <div className="text-sm text-white-400">
                        <span className="font-semibold font-semibold text-yellow-400">Degree Type:</span>{" "}
                        {schoolDetail?.degreeType || "-"}
                      </div>
                      <div className="text-sm text-white-400">
                        <span className="font-semibold font-semibold text-yellow-400">Start Year:</span>{" "}
                        {schoolDetail?.startYear || "-"}
                      </div>
                      <div className="text-sm text-white-400">
                        <span className="font-semibold font-semibold text-yellow-400">End Year:</span>{" "}
                        {schoolDetail?.endYear || "-"}
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-yellow-300">No school records available</span>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
  <div className="flex justify-end">
    {/* <Link
      to={UPDATE_PROFILE}
      className="w-20 bg-yellow-500 text-white font-semibold text-center py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 transition-all duration-200"
    > */}
      {loading ? <Loader /> : "Edit"}
    {/* </Link> */}
  </div>
</div>

        </div>
      )}
    </div>
  );
}

export default ProfileView;
