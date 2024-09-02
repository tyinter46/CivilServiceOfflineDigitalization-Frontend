/* eslint-disable no-undef */
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "components/widgets";
import { TesClose } from "components/icons";
import * as Yup from "yup";
import { UserDetails, Settings } from "types";
// import { School, SchoolList } from './components'; // Assuming components are imported

// interface SchoolListProps {
//   schools: School[];
// }
// const schools: School[] = [
//   { name: "School 1", info: "Some info about School 1" },
//   { name: "School 2", info: "Some info about School 2" },
//   { name: "School 3", info: "Some info about School 3" },
//   { name: "School 4", info: "Some info about School 4" }
//   // Add more schools here
// ];
// const SchoolList: React.FC<SchoolListProps> = ({ schools }) => {
//   return (
//     <div>
//       {schools.map((school, index) => (
//         <SchoolComponent key={index} school={school} />
//       ))}
//     </div>
//   );
// };

type ModalId = string | null;

interface ModalProps {
  title?: string;
  onSubmit: Function;
  userDetails: UserDetails;
  setOpenModal: (value: ModalId | null) => void;
  [key: string]: any;
}

const ProfileViewModal: React.FC<ModalProps> = ({
  title,
  setOpenModal,
  onSubmit,
  userDetails
}: ModalProps) => {
  const ProfileViewSchema = Yup.object().shape({
    tscFileNumber: Yup.string().min(9, "Too Short").max(16, "Too Long!").required("Required"),
    schoolOfPresentPosting: Yup.string().min(5, "Too short!").required("Required"),
    zone: Yup.string().min(4, "Too short!").required("Required"),
    division: Yup.string().required("Required"),
    nationality: Yup.string().required("Required"),
    stateOfOrigin: Yup.string().required("Required"),
    lgOfOrigin: Yup.string().required("Required"),
    ward: Yup.string().required("Required"),
    qualifications: Yup.array().of(
      Yup.object().shape({
        degreeType: Yup.string().required("Required"),
        specialization: Yup.string().required("Required"),
        startYear: Yup.number()
          .required("Required")
          .min(1900, "Invalid year")
          .max(new Date().getFullYear(), "Invalid year"),
        endYear: Yup.number()
          .required("Required")
          .min(Yup.ref("startYear"), "Must be after start year")
          .max(new Date().getFullYear(), "Invalid year"),
        schoolName: Yup.string().required("Required")
      })
    ),
    dateOfPresentSchoolPosting: Yup.date().max(new Date(), "Cannot be in the future"),
    cadre: Yup.string().required("Required"),
    gradeLevel: Yup.string().required("Required"),
    pfa: Yup.string().required("Required"),
    pensionNumber: Yup.string().required("Required"),
    professionalStatus: Yup.string().required("Required")
  });

  const initialValues: Settings = {
    tscFileNumber: userDetails?.tscFileNumber || "",
    schoolOfPresentPosting: userDetails?.schoolOfPresentPosting || "",
    zone: userDetails?.zone || "",
    division: userDetails?.division || "",
    nationality: userDetails?.nationality || "",
    stateOfOrigin: userDetails?.stateOfOrigin || "",
    lgOgOrigin: userDetails?.lgOgOrigin || "",
    ward: userDetails?.ward || "",
    qualifications: userDetails?.qualifications || [],
    dateOfPresentSchoolPosting: userDetails?.dateOfPresentSchoolPosting || "",
    cadre: userDetails?.cadre || "",
    gradeLevel: userDetails?.gradeLevel || "",
    pfa: userDetails?.pfa || "",
    pensionNumber: userDetails?.pensionNumber || "",
    professionalStatus: userDetails?.professionalStatus || "",
    email: userDetails?.email || ""
  };

  const handleSubmit = (values: Settings) => {
    const event = {
      id: userDetails?._id,
      ...values
    };
    onSubmit(event);
    setTimeout(() => {
      setOpenModal(null);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
        <div className="bg-brown px-4 py-3 flex items-center justify-between rounded-t-lg">
          <h2 className="text-lg font-medium text-white">{title}</h2>
          <TesClose
            size={24}
            onClick={() => {
              setOpenModal(null);
            }}
            className="text-green-500 cursor-pointer"
          />
        </div>
        <div className="p-6 bg-black">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={ProfileViewSchema}
          >
            {/* {({ errors, touched }) => ( */}
            {({}) => (
              <Form className="space-y-6 text-black">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <label htmlFor="tscFileNumber" className="block text-l font-large text-white">
                      TSC File Number
                    </label>
                    <Field
                      id="tscFileNumber"
                      name="tscFileNumber"
                      placeholder="Enter TSC File Number"
                      className="input-field"
                      // touched = {Formik.errors}
                      // touched = {Formik.touched}
                    />
                    <ErrorMessage
                      name="tscFileNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="schoolOfPresentPosting"
                      className="block text-l font-medium text-white"
                    >
                      School of Present Posting
                    </label>
                    <Field
                      id="schoolOfPresentPosting"
                      name="schoolOfPresentPosting"
                      placeholder="Enter School of Present Posting"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="schoolOfPresentPosting"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="zone" className="block text-l font-medium text-white">
                      Zone
                    </label>
                    <Field id="zone" name="zone" placeholder="Enter Zone" className="input-field" />
                    <ErrorMessage name="zone" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="division" className="block text-sm font-medium text-white">
                      Division
                    </label>
                    <Field
                      id="division"
                      name="division"
                      placeholder="Enter Division"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="division"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="nationality" className="block text-l  font-medium text-white">
                      Nationality
                    </label>
                    <Field
                      id="nationality"
                      name="nationality"
                      placeholder="Enter Nationality"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="nationality"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="stateOfOrigin" className="block text-l  font-medium text-white">
                      State of Origin
                    </label>
                    <Field
                      id="stateOfOrigin"
                      name="stateOfOrigin"
                      placeholder="Enter State of Origin"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="stateOfOrigin"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="lgOgOrigin" className="block text-l  font-medium text-white">
                      Local Government of Origin
                    </label>
                    <Field
                      id="lgOgOrigin"
                      name="lgOgOrigin"
                      placeholder="Enter Local Government of Origin"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="lgOgOrigin"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="ward" className="block text-l font-medium text-white">
                      Ward
                    </label>
                    <Field id="ward" name="ward" placeholder="Enter Ward" className="input-field" />
                    <ErrorMessage name="ward" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label
                      htmlFor="dateOfPresentSchoolPosting"
                      className="block text-l  font-medium text-white"
                    >
                      Date of Present School Posting
                    </label>
                    <Field
                      id="dateOfPresentSchoolPosting"
                      name="dateOfPresentSchoolPosting"
                      type="date"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="dateOfPresentSchoolPosting"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="cadre" className="block text-l  font-medium text-white">
                      Cadre
                    </label>
                    <Field
                      id="cadre"
                      name="cadre"
                      placeholder="Enter Cadre"
                      className="input-field"
                    />
                    <ErrorMessage name="cadre" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="gradeLevel" className="block text-l font-medium text-white">
                      Grade Level
                    </label>
                    <Field
                      id="gradeLevel"
                      name="gradeLevel"
                      placeholder="Enter Grade Level"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="gradeLevel"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="pfa" className="block text-l  font-medium text-white">
                      PFA
                    </label>
                    <Field id="pfa" name="pfa" placeholder="Enter PFA" className="input-field" />
                    <ErrorMessage name="pfa" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="pensionNumber" className="block text-l  font-medium text-white">
                      Pension Number
                    </label>
                    <Field
                      id="pensionNumber"
                      name="pensionNumber"
                      placeholder="Enter Pension Number"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="pensionNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="professionalStatus"
                      className="block text-l  font-medium text-white"
                    >
                      Professional Status
                    </label>
                    <Field
                      id="professionalStatus"
                      name="professionalStatus"
                      placeholder="Enter Professional Status"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="professionalStatus"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                {/* 
                {/* Qualifications FieldArray */}
                {/* <div>
                  <label className="block text-sm font-medium text-white mb-2">Qualifications</label>
                  <FieldArray name="qualifications">
                    {({ push, remove }) => (
                      <>
                        {values.qualifications.map((qualification, index) => (
                          <SchoolList
                            key={index}
                            index={index}
                            qualification={qualification}
                            remove={remove}
                          />
                        ))}
                        <Button
                          type="button"
                          onClick={() =>
                            push({
                              degreeType: '',
                              specialization: '',
                              startYear: '',
                              endYear: '',
                              schoolName: '',
                            })
                          }
                          className="text-sm py-2 px-4 rounded-md bg-green-500 text-white"
                        >
                          Add Qualification
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </div>
                  */}

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="text-l py-2 px-4 rounded-md bg-green-500 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewModal;
