import React, { useState } from "react";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
 import Select from "react-select";
// import LogoLoader from "../../components/widgets/loader/LogoLoader";
// import { zones, subjectsTaught} from "./DropDownOptions";
import { institutions, Years, subjectsTaught, specializations, zones, PFA , states, professionalGradeLevel, nonProfessionalGradeLevel} from "./DropDownOptions";

import { Navbar } from "components";
import { UserDetails, ISchools } from "types";


// Sample dropdown options
// const schoolOptions = [
//   { value: "School1", label: "School 1" },
//   { value: "School2", label: "School 2" },
// ];
// const zoneOptions = zones

const zoneOptions = zones.map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

interface PageProps {
  schools: ISchools[];
  onSubmit: Function;
  userDetails: UserDetails;
}
const divisionOptions = ["YEWA", "EGBA", "IJEBU", "REMO"].map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const ProfileUpdatePage = ({ onSubmit, userDetails, schools }: PageProps) => {
  const [formValues, setFormValues] = useState({
    dateOfFirstAppointment: userDetails?.dateOfFirstAppointment,
    tscFileNumber: userDetails?.tscFileNumber || "",
    schoolOfPresentPosting: userDetails?.schoolOfPresentPosting || "",
    schoolOfPreviousPosting: userDetails?.schoolOfPreviousPosting || "",
    zone: userDetails?.zone || "",
    division: userDetails?.division || "",
    nationality: userDetails?.nationality || "",
    stateOfOrigin: userDetails?.stateOfOrigin || "",
    lgOgOrigin: userDetails?.lgOgOrigin || "",
    ward: userDetails?.ward || "",
    qualifications: userDetails?.qualifications || [],
    subjectsTaught: userDetails?.subjectsTaught || [],
    dateOfPresentSchoolPosting: userDetails?.dateOfPresentSchoolPosting || "",
    cadre: userDetails?.cadre || "",
    gradeLevel: userDetails?.gradeLevel || "",
    pfa: userDetails?.pfa || "",
    pensionNumber: userDetails?.pensionNumber || "",
    staffType: userDetails?.staffType || "",
    email: userDetails?.email || "",
    nameOfNextOfKin: userDetails?.nameOfNextOfKin || "",
    nextOfKinAddress: userDetails?.nextOfKinAddress || "",
    nextOfKinPhoneNumber:  userDetails?.nextOfKinPhoneNumber || ""
  });

  //       const subjectsTaughtOptions = subjectsTaught.map((option) => ({
  //       value: option,
  //       label: option,
  //     }));

  const specializationOptions = specializations.map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));


  const qualificationOptions = [
    "FSLC",
    "SSCE",
    "NCE",
    "Bsc.",
    "Bed.",
    "B.A",
    "PGD",
    "ND",
    "HND",
    "Phd",
    "Able Bodied"
  ];

  const institutionNameOptions = institutions.map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));

  // const schoolOptions = schools

  const schoolOptions = schools.map((school) => ({
    value: school._id ?? "",
    label: `${school?.nameOfSchool} ${school?.category} ${school?.location}`
  }));
  

  const startYearOptions = Years.filter((year) => year).map((year) => ({
    value: year ?? "",
    label: `${year}`
  }));

  const endYearOptions = Years.filter((year) => year).map((year) => ({
    value: year ?? "",
    label: `${year}`
  }));

  //   const subjectsTaughtOptions = subjectsTaught.map((option) => ({
  //   value: option,
  //   label: option,
  // }));

    const stateOptions = states
    .map((option) => ({
     value: option ?? "",
      label: `${option}`
}));

  const pfaOptions = PFA
.map((option) => ({
 value: option ?? "",
  label: `${option}`
}));
  // Schema validation using Yup
  const ProfileViewSchema = Yup.object().shape({
    tscFileNumber: Yup.string().min(9, "Too Short").max(16, "Too Long!").required("Required"),
    schoolOfPresentPosting: Yup.string().required("Required"),
    schoolOfPreviousPosting: Yup.string().required("Required"),
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
        startYear: Yup.string()
          .required("Required")
          .min(1900, "Invalid year")
          .max(new Date().getFullYear(), "Invalid year"),
        endYear: Yup.string()
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

  // Handle changes for CreatableSelect dropdowns
  const handleSelectChange = (name: string) => (selectedOption: any) => {
    setFormValues({
      ...formValues,
      [name]: selectedOption ? selectedOption.value : ""
    });
  };

 
  // Handle changes for input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // Handle adding/removing subject fields
  const addSubject = () => {
    setFormValues({
      ...formValues,
      subjectsTaught: [...formValues.subjectsTaught, ""]
    });
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = formValues.subjectsTaught.filter((_, i) => i !== index);
    setFormValues({ ...formValues, subjectsTaught: updatedSubjects });
  };

  const addQualification = () => {
    setFormValues({
      ...formValues,
      qualifications: [
        ...formValues.qualifications,
        {
          degreeType: "",
          specialization: "",
          startYear: "",
          endYear: "",
          schoolName: ""
        }
      ]
    });
  };

  const removeQualification = (index: number) => {
    const updatedQualifications = formValues.qualifications.filter((_, i) => i !== index);
    setFormValues({ ...formValues, qualifications: updatedQualifications });
  };

  // const handleSubjectChange = (index: number, value: string) => {
  //   const updatedSubjects = formValues.subjectsTaught.map((subject, i) =>
  //     i === index ? value : subject
  //   );
  //   setFormValues({ ...formValues, subjectsTaught: updatedSubjects });
  // };
  console.log(formValues);
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(formValues);
    e.preventDefault();
    console.log(formValues);
    try {
      await ProfileViewSchema.validate(formValues, { abortEarly: true });
      console.log(formValues);
      onSubmit(formValues);
      // Perform form submission
      console.log("Form submitted with values: ", formValues);
    } catch (validationErrors: any) {
      // Handle validation errors
      console.error("Validation errors: ", validationErrors);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-4xl mx-auto my-2 bg-white p-6 rounded-lg shadow-md mt-20 min-h-screen">
        <div className="py-8">
          <h2 className="text-lg font-medium text-gray-900">Update Profile Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              {/* TSC File Number */}
              <div>
                <label htmlFor="tscFileNumber" className="block text-l font-medium text-gray-900">
                  TSC File Number
                </label>
                <input
                  id="tscFileNumber"
                  name="tscFileNumber"
                  placeholder="Enter TSC File Number"
                  className="input-field"
                  value={formValues.tscFileNumber}
                  onChange={handleInputChange}
                />
              </div>

              {/* School of Present Posting using CreatableSelect */}
              <div>
                <label
                  htmlFor="schoolOfPresentPosting"
                  className="block text-l font-medium text-gray-900"
                >
                  School of Present Posting
                </label>
                <Select
                  isClearable
                  options={schoolOptions}
                  value={schoolOptions.find(
                    (option) => option.value === formValues.schoolOfPresentPosting
                  )}
                  onChange={handleSelectChange("schoolOfPresentPosting")}
                  placeholder="Select or create a school"
                />
              </div>

              {/* School of Previous Posting using CreatableSelect */}
              <div>
                <label
                  htmlFor="schoolOfPreviousPosting"
                  className="block text-l font-medium text-gray-900"
                >
                  School of Previous Posting
                </label>
                <Select
                  isClearable
                  options={schoolOptions}
                  value={schoolOptions.find(
                    (option) => option.value === formValues.schoolOfPreviousPosting
                  )}
                  onChange={handleSelectChange("schoolOfPreviousPosting")}
                  placeholder="Select or create a school"
                />
              </div>
              {/* Zone using CreatableSelect */}
              <div>
                <label htmlFor="zones" className="block text-l font-medium text-gray-900">
                  Zone
                </label>
                <Select
                  isClearable
                  options={zoneOptions}
                  value={zoneOptions.find((option) => option.value === formValues.zone)}
                  onChange={handleSelectChange("zones")}
                  placeholder="Select or create a zone"
                />
              </div>

              {/* Division using CreatableSelect */}
              <div>
                <label htmlFor="division" className="block text-l font-medium text-gray-900">
                  Division
                </label>
                <Select
                  isClearable
                  options={divisionOptions}
                  value={divisionOptions.find((option) => option.value === formValues.division)}
                  onChange={handleSelectChange("division")}
                  placeholder="Select or create a division"
                />
              </div>

       <div>
                 <label htmlFor="stateOfOrigin" className="block text-l font-medium text-gray-900">
                   State of Origin
                   </label>
                   <CreatableSelect
                      name="stateOfOrigin"
                       id="stateOfOrigin"
                      options={stateOptions}
                      value={stateOptions.find(
                        (option) => option.value === formValues.stateOfOrigin
                      ) ?? { value: formValues.stateOfOrigin, label: formValues.stateOfOrigin }}
                      onChange={handleSelectChange("stateOfOrigin")}
                      className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Select State of Origin"
                      isSearchable
                      isClearable
                       required
                     />
                   </div> 

{/* Email */}
              <div>
                <label htmlFor="email" className="block text-l font-medium text-gray-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  className="input-field"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Subject Taught with dynamic CreatableSelect fields */}
              {formValues.subjectsTaught.map((subject, index) => (
                <div key={index} className="subjectsTaught-field-group">
                  <label
                    htmlFor={`subjectsTaught-${index}`}
                    className="block text-l font-medium text-gray-900"
                  >
                    Subject Taught
                  </label>
                  <CreatableSelect
                    isClearable
                    value={{ value: subject, label: subject }}
                    options={subjectsTaught.map((sub) => ({ value: sub, label: sub }))}
                    onChange={(selectedOption) => {
                      const updatedSubjects = [...formValues.subjectsTaught];
                      updatedSubjects[index] = selectedOption ? selectedOption.value : "";
                      setFormValues({ ...formValues, subjectsTaught: updatedSubjects });
                    }}
                    placeholder="Select or create a subject"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="bg-red-500 text-white px-1 py-1 rounded-md mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSubject}
                className="bg-indigo-500 text-white px-1 py-1 rounded-md mt-4"
              >
                Add Subjects Taught
              </button>

              {/* Qualifications with dynamic CreatableSelect fields */}
              {formValues.qualifications.map((qualification, index) => (
                <div key={index} className="qualification-field-group">
                  {/* School Name Field */}
                  <label
                    htmlFor={`qualifications-${index}-schoolName`}
                    className="block text-l font-medium text-gray-900"
                  >
                    School Name
                  </label>
                  <CreatableSelect
                    isClearable
                    value={{ value: qualification.schoolName, label: qualification.schoolName }}
                    options={institutionNameOptions.map((opt) => ({
                      value: opt.value,
                      label: opt.label
                    }))}
                    onChange={(selectedOption) => {
                      const updatedQualifications = [...formValues.qualifications];
                      updatedQualifications[index].schoolName = selectedOption
                        ? selectedOption.value
                        : "";
                      setFormValues({ ...formValues, qualifications: updatedQualifications });
                    }}
                    placeholder="Select or create a school"
                  />

                  {/* Degree Type Field */}
                  <label
                    htmlFor={`qualifications-${index}-degreeType`}
                    className="block text-l font-medium text-gray-900 mt-2"
                  >
                    Degree Type
                  </label>
                  <CreatableSelect
                    isClearable
                    value={{ value: qualification.degreeType, label: qualification.degreeType }}
                    options={qualificationOptions.map((opt) => ({ value: opt, label: opt }))}
                    onChange={(selectedOption) => {
                      const updatedQualifications = [...formValues.qualifications];
                      updatedQualifications[index].degreeType = selectedOption
                        ? selectedOption.value
                        : "";
                      setFormValues({ ...formValues, qualifications: updatedQualifications });
                    }}
                    placeholder="Select or create a degree type"
                  />

                  {/* Specialization Field */}
                  <label
                    htmlFor={`qualifications-${index}-specialization`}
                    className="block text-l font-medium text-gray-900 mt-2"
                  >
                    Specialization
                  </label>
                  <CreatableSelect
                    isClearable
                    value={{
                      value: qualification.specialization,
                      label: qualification.specialization
                    }}
                    options={specializationOptions.map((opt) => ({
                      value: opt.value,
                      label: opt.label
                    }))}
                    onChange={(selectedOption) => {
                      const updatedQualifications = [...formValues.qualifications];
                      updatedQualifications[index].specialization = selectedOption
                        ? selectedOption.value
                        : "";
                      setFormValues({ ...formValues, qualifications: updatedQualifications });
                    }}
                    placeholder="Select or create a specialization e.g Course("
                  />

                  {/* Start Year Field */}
                  <label
                    htmlFor={`qualifications-${index}-startYear`}
                    className="block text-l font-medium text-gray-900 mt-2"
                  >
                    Start Year
                  </label>
                  <CreatableSelect
                    isClearable
                    value={{ value: qualification.startYear, label: qualification.startYear }}
                    options={startYearOptions.map((opt) => ({
                      value: opt.value,
                      label: opt.label
                    }))}
                    onChange={(selectedOption) => {
                      const updatedQualifications = [...formValues.qualifications];
                      updatedQualifications[index].startYear = selectedOption
                        ? selectedOption.value
                        : "";
                      setFormValues({ ...formValues, qualifications: updatedQualifications });
                    }}
                    placeholder="Select or create a start year"
                  />

                  {/* End Year Field */}
                  <label
                    htmlFor={`qualifications-${index}-endYear`}
                    className="block text-l font-medium text-gray-900 mt-2"
                  >
                    End Year
                  </label>
                  <CreatableSelect
                    isClearable
                    value={{ value: qualification.endYear, label: qualification.endYear }}
                    options={endYearOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
                    onChange={(selectedOption) => {
                      const updatedQualifications = [...formValues.qualifications];
                      updatedQualifications[index].endYear = selectedOption
                        ? selectedOption.value
                        : "";
                      setFormValues({ ...formValues, qualifications: updatedQualifications });
                    }}
                    placeholder="Select or create an end year"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    className="bg-red-500 text-white px-1 py-1 rounded-md mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Add Qualification Button */}
              <button
                type="button"
                onClick={addQualification}
                className="bg-indigo-500 text-white px-1 py-1 rounded-md mt-4"
              >
                Add Qualification
              </button>
              {/* PFA Number  & PFA */}
                <div>
                    <label htmlFor="pfa" className="block text-l font-medium text-gray-900">
                      Pension Fund Administrator
                    </label>
                    <CreatableSelect
                      name="pfa"
                      id="pfa"
                      className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Select Pension Fund Administrator"
                      isSearchable
                      isClearable
                      required

                      options={pfaOptions}
                      value={pfaOptions.find((option) => option.value === formValues.pfa)}
                      onChange={handleSelectChange("pfa")}
                 
                    />
                  </div>
              <div>
                <label htmlFor="pensionNumber" className="block text-l font-medium text-gray-900">
                  PFA Number
                </label>
                <input
                  id="pensionNumber"
                  name="pensionNumber"
                  placeholder="Enter PFA Number"
                  className="input-field"
                  value={formValues.pensionNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
              {/* Submit Button */}
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                  Update Profile
                </button>
              </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdatePage;

// import { Formik, Form, Field,   ErrorMessage } from "formik";
// // import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

// import React from "react";
// import * as Yup from "yup";
// import { UserDetails, Settings } from "types";
// // import { UserDetails, Settings, ISchools } from "types";

// // import CreatableSelect from "react-select/creatable";
// // import Select, { SingleValue } from "react-select";
// // import LogoLoader from "../../components/widgets/loader/LogoLoader";
// import { Navbar } from "components";
// // import { subjectsTaught} from "./DropDownOptions";
// // import { institutions, Years, subjectsTaught, specializations, PFA} from "./DropDownOptions";

// // import { institutions, Years, subjectsTaught, specializations, zones , states, PFA} from "./DropDownOptions";

// interface PageProps {
//   // schools: ISchools[];
//   onSubmit: Function
// }

// // interface SelectOption {
// //   value: string | SelectOption;
// //   label: string;
// // }

// const ProfileUpdatePage: React.FC<PageProps> = ({  onSubmit}) => {
//   const userDetails: UserDetails = {
//     tscFileNumber: "",
//     schoolOfPresentPosting: "",
//     schoolOfPreviousPosting: "",
//     zone: "",
//     division: "",
//     nationality: "",
//     stateOfOrigin: "",
//     lgOgOrigin: "",
//     ward: "",
//     qualifications: [],
//     dateOfPresentSchoolPosting: "",
//     cadre: "",
//     gradeLevel: "",
//     pfa: "",
//     pensionNumber: "",
//     professionalStatus: "",
//     staffType: "",
//     email: "",
//     _id: "",
//     letters: "",
//     staffName: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     dateOfFirstAppointment: "",
//     dateOfRetirement: "",
//     ogNumber: "",
//     residentialAddress: "",
//     subjectsTaught: []
//   };
//   // const [selectedSchoolOfPresentPosting, setSelectedSchoolOfPresentPosting] = useState<
//   //   string | null
//   // >(null);
//   // const [selectedSchoolOfPreviousPosting, setSelectedSchoolOfPreviousPosting] = useState<
//   //   string | null
//   // >(null);
//   // const [loading, setLoading] = useState(false);
//   // const [selectedQualification, setSelectedQualification] = useState<string | null>(null);
//   // const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
//   // const [selectedInstitution, setSelectedInstitution]= useState<string | null>(null);
//   // const [selectedStartYear, setSelectedStartYear] = useState<string | null>(null);
//   // const [selectedEndYear, setSelectedEndYear] = useState<string | null>(null);
//   // const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null)
//   // const [selectedSubjectTaught, setSelectedSubjectsTaught] = useState<string | null>(null)
//   //  const [selectedZone, setSelectedZone] =  useState<string | null>(null);
// // const [selectedState, setSelectedState] = useState<string | null>(null);
// // const [selectedPFA, setSelectedPFA] = useState<string | null>(null);

//   const ProfileViewSchema = Yup.object().shape({
//     tscFileNumber: Yup.string().min(9, "Too Short").max(16, "Too Long!").required("Required"),
//     schoolOfPresentPosting: Yup.string().required("Required"),
//     schoolOfPreviousPosting: Yup.string().required("Required"),
//     zone: Yup.string().min(4, "Too short!").required("Required"),
//     division: Yup.string().required("Required"),
//     nationality: Yup.string().required("Required"),
//     stateOfOrigin: Yup.string().required("Required"),
//     lgOfOrigin: Yup.string().required("Required"),
//     ward: Yup.string().required("Required"),
//     qualifications: Yup.array().of(
//       Yup.object().shape({
//         degreeType: Yup.string().required("Required"),
//         specialization: Yup.string().required("Required"),
//         startYear: Yup.string()
//           .required("Required")
//           .min(1900, "Invalid year")
//           .max(new Date().getFullYear(), "Invalid year"),
//         endYear: Yup.string()
//           .required("Required")
//           .min(Yup.ref("startYear"), "Must be after start year")
//           .max(new Date().getFullYear(), "Invalid year"),
//         schoolName: Yup.string().required("Required")
//       })
//     ),
//     dateOfPresentSchoolPosting: Yup.date().max(new Date(), "Cannot be in the future"),
//     cadre: Yup.string().required("Required"),
//     gradeLevel: Yup.string().required("Required"),
//     pfa: Yup.string().required("Required"),
//     pensionNumber: Yup.string().required("Required"),
//     professionalStatus: Yup.string().required("Required")
//   });

//   const initialValues: Settings = {
//      tscFileNumber: userDetails?.tscFileNumber || "",
//     schoolOfPresentPosting: userDetails?.schoolOfPresentPosting || "",
//     schoolOfPreviousPosting: userDetails?.schoolOfPreviousPosting || "",
//     zone: userDetails?.zone || "",
//     division: userDetails?.division || "",
//     nationality: userDetails?.nationality || "",
//     stateOfOrigin: userDetails?.stateOfOrigin || "",
//     lgOgOrigin: userDetails?.lgOgOrigin || "",
//     ward: userDetails?.ward || "",
//     qualifications: userDetails?.qualifications || [],
//     subjectsTaught: userDetails?.subjectsTaught || [],
//     dateOfPresentSchoolPosting: userDetails?.dateOfPresentSchoolPosting || "",
//     cadre: userDetails?.cadre || "",
//     gradeLevel: userDetails?.gradeLevel || "",
//     pfa: userDetails?.pfa || "",
//     pensionNumber: userDetails?.pensionNumber || "",
//     professionalStatus: userDetails?.professionalStatus || "",
//     staffType: userDetails?.staffType || "",
//     email: userDetails?.email || ""
//   };

//   // const schoolOptions: SelectOption[] = schools
//   //       .map((school) => ({
//   //     value: school._id ?? "",
//   //     label: `${school?.nameOfSchool} ${school?.category} ${school?.location}`
//   //   }));

//     const stateOptions: SelectOption[] = states
//     .map((option) => ({
//      value: option ?? "",
//       label: `${option}`
// }));

// //     const zoneOptions: SelectOption[] = zones
// //     .map((option) => ({
// //      value: option ?? "",
// //       label: `${option}`
// // }));

// // const pfaOptions : SelectOption[] = PFA
// // .map((option) => ({
// //  value: option ?? "",
// //   label: `${option}`
// // }));
// //   const startYearOptions: SelectOption[] = Years.filter((year) => year)
// //   .map((year) => ({
// //     value: year ?? "",
// //     label: `${year}`
// //   }));

// //   const endYearOptions: SelectOption[] = Years.filter((year) => year)
// //   .map((year) => ({
// //     value: year ?? "",
// //     label: `${year}`
// //   }));

// //   const qualificationOptions: SelectOption[] = [
// //     "FSLC",
// //     "SSCE",
// //     "NCE",
// //     "Bsc.",
// //     "Bed.",
// //     "B.A",
// //     "PGD",
// //     "ND",
// //     "HND",
// //     "Phd",
// //     "Able Bodied"
// //   ]

// //     .map((option) => ({
// //       value: option ?? "",
// //       label: `${option}`
// //     }));

// //   const divisionOptions: SelectOption[] = ["YEWA", "EGBA", "IJEBU", "REMO"]
// //     .map((option) => ({
// //       value: option ?? "",
// //       label: `${option}`
// //     }));

//     // const subjectsTaughtOptions: SelectOption[] = subjectsTaught.map((option) => ({
//     //   value: option,
//     //   label: option,
//     // }));

// // const specializationOptions : SelectOption[] = specializations
// // .map((option) => ({
// //   value: option ?? "",
// //   label: `${option}`
// // }));

// // const institutionNameOptions: SelectOption[] = institutions

// //     .map((option) => ({
// //       value: option ?? "",
// //       label: `${option}`
// //     }));

//   const handleSubmit = (values: Settings) => {
//     console.log( values)
//     const event = {
//      id:userDetails?._id,
//      subjectsTaught: values?.subjectsTaught,
//      tscFileNumber: values?.tscFileNumber,
//      schoolOfPresentPosting: values?.schoolOfPresentPosting,
//      schoolOfPreviousPosting: values?.schoolOfPreviousPosting,
//      zone: values?.zone,
//      division: values?.division,
//      nationality: values?.nationality,
//      stateOfOrigin: values?.stateOfOrigin,
//      lgOgOrigin: values?.lgOgOrigin,
//      ward: values?.ward,
//      qualifications: values?.qualifications,
//      dateOfPresentSchoolPosting: values?.dateOfPresentSchoolPosting,
//      cadre: values?.cadre,
//      gradeLevel: values?.gradeLevel,
//      pfa: values?.pfa,
//      pensionNumber: values?.pensionNumber,
//      professionalStatus: values?.professionalStatus,
//      staffType: values?.staffType,
//      email: values?.email
//     };
//     onSubmit(event);
//    console.log( event)

//   };

//   // const handleSelectChange =
//   //   (setter: React.Dispatch<React.SetStateAction<string | null>>) =>
//   //   async (selectedOption: SingleValue<SelectOption>) => {
//   //     const newValue : any = selectedOption ? selectedOption.value : null;
//   //      setter(newValue);
//   //   };

//   return (
//     <>
//       <Navbar />
//       {/* {!loading ? ( */}
//         <div className="w-full max-w-4xl mx-auto my-2 bg-white p-6 rounded-lg shadow-md mt-20 min-h-screen">
//           <div className="py-8">
//           <h2 className="text-lg font-medium text-gray-900">Update Profile Details</h2>
//           <Formik
//             initialValues={initialValues}
//             onSubmit={handleSubmit}
//             validationSchema={ProfileViewSchema}
//           >
//             {({ }) => (

//               <Form className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
//                   {/* TSC File Number */}
//                    <div>
//                     <label
//                       htmlFor="tscFileNumber"
//                       className="block text-l font-medium text-gray-900"
//                     >
//                       TSC File Number
//                     </label>
//                     <Field
//                       id="tscFileNumber"
//                       name="tscFileNumber"
//                       placeholder="Enter TSC File Number"
//                       className="input-field"
//                     />
//                     <ErrorMessage
//                       name="tscFileNumber"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>

//                      {/* School of Previous Posting */}
//                      {/* <div>
//                     <label
//                       htmlFor="schoolOfPreviousPosting"
//                       className="block text-l font-medium text-gray-900"
//                     >
//                       School of Previous Posting
//                     </label>
//                     <Select<SelectOption>
//                       name="schoolOfPreviousPosting"
//                       id="schoolOfPreviousPosting"
//                       options={schoolOptions}
//                       value={schoolOptions.find(
//                         (option) => option.value === selectedSchoolOfPreviousPosting
//                       )}
//                       onChange={handleSelectChange(setSelectedSchoolOfPreviousPosting)}
//                       className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="Select School of Previous Posting"
//                       isSearchable
//                       isClearable
//                       required
//                     />
//                   </div> */}

//                   {/* School of Present Posting */}
//                   {/* <div>
//                     <label
//                       htmlFor="schoolOfPresentPosting"
//                       className="block text-l font-medium text-gray-900"
//                     >
//                       School of Present Posting
//                     </label>
//                     <Select<SelectOption>
//                       name="schoolOfPresentPosting"
//                       id="schoolOfPresentPosting"
//                       options={schoolOptions}
//                       value={schoolOptions.find(
//                         (option) => option.value === selectedSchoolOfPresentPosting
//                       )}
//                       onChange={handleSelectChange(setSelectedSchoolOfPresentPosting)}
//                       className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="Select School of Present Posting"
//                       isSearchable
//                       isClearable
//                       required
//                     />
//                   </div> */}

//                   {/* Additional Fields */}
//                   {/* <div>
//                     <label htmlFor="zones" className="block text-l font-medium text-gray-900">
//                       Zone
//                     </label>
//                     <Select<SelectOption>
//                       name="zones"
//                       id="zones"
//                       options={zoneOptions}
//                       value={zoneOptions.find(
//                         (option) => option.value === selectedZone
//                       )}
//                       onChange={handleSelectChange(setSelectedZone)}
//                       className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="Select Zone of Present School Posting"
//                       isSearchable
//                       isClearable
//                       required
//                     />
//                   </div> */}

//                   {/* <div>
//                     <label htmlFor="division" className="block text-l font-medium text-gray-900">
//                       Division
//                     </label>
//                     <Select<SelectOption>
//                       id="division"
//                       name="division"
//                       options={divisionOptions}
//                       value={divisionOptions.find((option) => option.value === selectedDivision)}
//                       onChange={handleSelectChange(setSelectedDivision)}
//                       className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="Enter Division"
//                       isSearchable
//                       isClearable
//                       required
//                     />

//                   </div>

//              {/* Additional Fields */}
//                   {/* <div>
//                     <label htmlFor="stateOfOrigin" className="block text-l font-medium text-gray-900">
//                       State of Origin
//                     </label>
//                     <Select<SelectOption>
//                       name="stateOfOrigin"
//                       id="stateOfOrigin"
//                       options={stateOptions}
//                       value={stateOptions.find(
//                         (option) => option.value === selectedState
//                       )}
//                       onChange={handleSelectChange(setSelectedState)}
//                       className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="Select Zone of Present School Posting"
//                       isSearchable
//                       isClearable
//                       required
//                     />
//                   </div>  */}

//                   {/* Qualifications Field Array */}

// {/* PFA */}
//         {/* <div>
//                     <label htmlFor="pfa" className="block text-l font-medium text-gray-900">
//                       Pension Fund Administrator
//                     </label>
//                     <Select<SelectOption>
//                       name="pfa"
//                       id="pfa"
//                       options={pfaOptions}
//                       value={pfaOptions.find(
//                         (option) => option.value === selectedPFA
//                       )}
//                       onChange={handleSelectChange(setSelectedPFA)}
//                       className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="Select Pension Fund Administrator"
//                       isSearchable
//                       isClearable
//                       required
//                     />
//                   </div>

// <FieldArray name="subjectsTaught">
//   {({ remove, push }) => (
//     <>
//       {/* Ensure there is at least one item initially */}
//       {values.subjectsTaught.length > 0 &&
//         values.subjectsTaught.map((_, index) => (
//           <div key={index} className="subjectsTaught-field-group">
//             <div>
//               <label
//                 htmlFor={`subjectsTaught.${index}`}
//                 className="block text-l font-medium text-gray-900"
//               >
//                 Subject Taught
//               </label>
//               <CreatableSelect<SelectOption | string>
//                 name={`subjectsTaught.${index}`}
//                 id={`subjectsTaught.${index}`}
//                 options={subjectsTaughtOptions}
//                 value={subjectsTaughtOptions.find(
//                   (option) => option.value === selectedSubjectTaught
//                 )}
//                 onCreateOption={(inputValue) => {
//                   const newOption = { value: inputValue, label: inputValue };
//                   setSelectedSubjectsTaught(inputValue);
//                   subjectsTaught.push(newOption.value);
//                 }}
//                 className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Search or Select Subject Taught"
//                 isSearchable
//                 isClearable
//                 required
//               />
//             </div>

//             {/* Remove button */}
//             <button
//               type="button"
//               onClick={() => remove(index)}
//               className="bg-red-500 text-white px-1 py-1 rounded-md mt-2"
//             >
//               Remove
//             </button>
//           </div>
//         ))}

//       {/* Button to add additional fields */}
//       <button
//         type="button"
//         onClick={() => push('')}  // Add an empty string to show an additional field
//         className="bg-indigo-500 text-white px-1 py-1 rounded-md mt-4"
//       >
//         Add Subjects Taught
//       </button>
//     </>
//   )}
// </FieldArray>

//                   {/* More fields go here... */}
//                   {/* PFA Number */}
//                   {/* <div>
//                     <label
//                       htmlFor="pfaNumber"
//                       className="block text-l font-medium text-gray-900"
//                     >
//                       PFA Number
//                     </label>
//                     <Field
//                       id="pfaNumber"
//                       name="pfaNumber"
//                       placeholder="Enter PFA Number"
//                       className="input-field"
//                       required
//                     />
//                     <ErrorMessage
//                       name="pfaNumber"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                   </div>  */}

//                   {/* Submit Button */}
//                   <div className="flex justify-end mt-4">
//                     <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">
//                       Update Profile
//                     </button>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//           </div>
//         </div>
//       {/* ) : (
//         <LogoLoader />
//       )} */}
//     </>
//   );
// };

// export default ProfileUpdatePage;

// <FieldArray name="qualifications">
// {({ remove, push }) => (
//   <>
//     {values.qualifications.length > 0 &&
//       values.qualifications.map((_, index) => (
//         <div key={index} className="qualification-field-group">
//           <div>
//             <label
//               htmlFor={`qualifications.${index}.schoolName`}
//               className="block text-l font-medium text-gray-900"
//             >
//               School Name
//             </label>
//             <CreatableSelect<SelectOption | string>
//               name={`qualifications.${index}.schoolName`}
//               id={`qualifications.${index}.schoolName`}
//               options={institutionNameOptions}
//               value={institutionNameOptions.find(
//                 (option) => option.value === selectedInstitution
//               )}
//               onCreateOption={(inputValue) => {
//                 const newOption = { value: inputValue, label: inputValue };
//                 setSelectedInstitution(inputValue);
//                 institutions.push(newOption.value);
//               }}
//               className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Search or Select Institution Name"
//               isSearchable
//               isClearable
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor={`qualifications.${index}.degreeType`}
//               className="block text-l font-medium text-gray-900"
//             >
//               Degree Type
//             </label>
//             <Select<SelectOption>
//               name={`qualifications.${index}.degreeType`}
//               id={`qualifications.${index}.degreeType`}
//               options={qualificationOptions}
//               value={qualificationOptions.find(
//                 (option) => option.value === selectedQualification
//               )}
//               onChange={handleSelectChange(setSelectedQualification)}
//               className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Search or Select Qualification"
//               isSearchable
//               isClearable
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor={`qualifications.${index}.specialization`}
//               className="block text-l font-medium text-gray-900"
//             >
//               Specialization
//             </label>
//             <CreatableSelect<SelectOption>
//               name={`qualifications.${index}.specialization`}
//               id={`qualifications.${index}.specialization`}
//               options={specializationOptions}
//               value={specializationOptions.find(
//                 (option: any) => option.value === selectedSpecialization
//               )}
//               onCreateOption={(inputValue) => {
//                 const newOption = { value: inputValue, label: inputValue };
//                 setSelectedSpecialization(inputValue);
//                 specializationOptions.push(newOption);
//               }}
//               onChange={handleSelectChange(setSelectedSpecialization)}
//               className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Search or Select Specialization"
//               isSearchable
//               isClearable
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor={`qualifications.${index}.startYear`}
//               className="block text-l font-medium text-gray-900"
//             >
//               Start Year
//             </label>
//             <Select<SelectOption>
//               name={`qualifications.${index}.startYear`}
//               id={`qualifications.${index}.startYear`}
//               options={startYearOptions}
//               value={startYearOptions.find(
//                 (option) => option.value === selectedStartYear
//               )}
//               onChange={handleSelectChange(setSelectedStartYear)}
//               className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Select Start Year"
//               isSearchable
//               isClearable
//               required
//             />

//             <label
//               htmlFor={`qualifications.${index}.endYear`}
//               className="block text-l font-medium text-gray-900"
//             >
//              End Year
//             </label>
//             <Select<SelectOption>
//               name={`qualifications.${index}.endYear`}
//               id={`qualifications.${index}.endYear`}
//               options={endYearOptions}
//               value={endYearOptions.find(
//                 (option) => option.value === selectedEndYear
//               )}
//               onChange={handleSelectChange(setSelectedEndYear)}
//               className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Select End Year"
//               isSearchable
//               isClearable
//               required
//             />
//           </div>

//           {/* Remove button */}
//           <button
//             type="button"
//             onClick={() => remove(index)}
//             className="bg-red-500 text-white px-1 py-1 rounded-md mt-2"
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//     <button
//       type="button"
//       onClick={() =>
//         push({
//           degreeType: "",
//           specialization: "",
//           startYear: "",
//           endYear: "",
//           schoolName: ""
//         })
//       }
//       className="bg-indigo-500 text-white px-1 py-1 rounded-md"
//     >
//       Add Qualification
//     </button>
//   </>
// )}
// </FieldArray>
