import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { UserDetails, Settings, ISchools } from "types"; 
import CreatableSelect from "react-select/creatable"; 
import Select, { SingleValue } from "react-select";
// import LogoLoader from "../../components/widgets/loader/LogoLoader";
import { Navbar } from "components";
import { institutions, Years, subjectsTaught, specializations, zones , states, PFA} from "./DropDownOptions";
interface PageProps {
  schools: ISchools[];

}

interface SelectOption {
  value: string | SelectOption;
  label: string;
}

const ProfileUpdatePage: React.FC<PageProps> = ({ schools}) => {
  const userDetails: UserDetails = {
    tscFileNumber: "",
    schoolOfPresentPosting: "",
    schoolOfPreviousPosting: "",
    zone: "",
    division: "",
    nationality: "",
    stateOfOrigin: "",
    lgOgOrigin: "",
    ward: "",
    qualifications: [],
    dateOfPresentSchoolPosting: "",
    cadre: "",
    gradeLevel: "",
    pfa: "",
    pensionNumber: "",
    professionalStatus: "",
    staffType: "",
    email: "",
    _id: "",
    letters: "",
    staffName: "",
    phoneNumber: "",
    dateOfBirth: "",
    dateOfFirstAppointment: "",
    dateOfRetirement: "",
    ogNumber: "",
    residentialAddress: "",
    subjectsTaught: []
  };
  const [selectedSchoolOfPresentPosting, setSelectedSchoolOfPresentPosting] = useState<
    string | null
  >(null);
  const [selectedSchoolOfPreviousPosting, setSelectedSchoolOfPreviousPosting] = useState<
    string | null
  >(null);
  // const [loading, setLoading] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState<string | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedInstitution, setSelectedInstitution]= useState<string | null>(null);
  const [selectedStartYear, setSelectedStartYear] = useState<string | null>(null);
  const [selectedEndYear, setSelectedEndYear] = useState<string | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null)
  const [selectedSubjectTaught, setSelectedSubjectsTaught] = useState<string | null>(null)
   const [selectedZone, setSelectedZone] =  useState<string | null>(null);
const [selectedState, setSelectedState] = useState<string | null>(null);
const [selectedPFA, setSelectedPFA] = useState<string | null>(null);

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

  const initialValues: Settings = {
    subjectsTaught: userDetails?.subjectsTaught || "",
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
    dateOfPresentSchoolPosting: userDetails?.dateOfPresentSchoolPosting || "",
    cadre: userDetails?.cadre || "",
    gradeLevel: userDetails?.gradeLevel || "",
    pfa: userDetails?.pfa || "",
    pensionNumber: userDetails?.pensionNumber || "",
    professionalStatus: userDetails?.professionalStatus || "",
    staffType: userDetails?.staffType || "",
    email: userDetails?.email || ""
  };

  const schoolOptions: SelectOption[] = schools
        .map((school) => ({
      value: school._id ?? "",
      label: `${school?.nameOfSchool} ${school?.category} ${school?.location}`
    }));

    const stateOptions: SelectOption[] = states
    .map((option) => ({
     value: option ?? "",
      label: `${option}`
}));

    const zoneOptions: SelectOption[] = zones
    .map((option) => ({
     value: option ?? "",
      label: `${option}`
}));

const pfaOptions : SelectOption[] = PFA
.map((option) => ({
 value: option ?? "",
  label: `${option}`
}));
  const startYearOptions: SelectOption[] = Years.filter((year) => year)
  .map((year) => ({
    value: year ?? "",
    label: `${year}`
  }));

  const endYearOptions: SelectOption[] = Years.filter((year) => year)
  .map((year) => ({
    value: year ?? "",
    label: `${year}`
  }));


  const qualificationOptions: SelectOption[] = [
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
  ]
 
    .map((option) => ({
      value: option ?? "",
      label: `${option}`
    }));

  const divisionOptions: SelectOption[] = ["YEWA", "EGBA", "IJEBU", "REMO"]
    .map((option) => ({
      value: option ?? "",
      label: `${option}`
    }));

    const subjectsTaughtOptions: SelectOption[] = subjectsTaught.map((option) => ({
      value: option,
      label: option,
    }));
    
const specializationOptions : SelectOption[] = specializations
.map((option) => ({
  value: option ?? "",
  label: `${option}`
}));



    const institutionNameOptions: SelectOption[] = institutions
  
    .map((option) => ({
      value: option ?? "",
      label: `${option}`
    }));

  const handleSubmit = (values: Settings) => {
    // const event = {
    //   id: userDetails?._id,
    //   ...values
    // };
    console.log(values)
    // onSubmit(event);
  };

  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<string | null>>) =>
    async (selectedOption: SingleValue<SelectOption>) => {
      const newValue : any = selectedOption ? selectedOption.value : null;
       setter(newValue);
    };

  return (
    <>
      <Navbar />
      {/* {!loading ? ( */}
        <div className="w-full max-w-4xl mx-auto my-2 bg-white p-6 rounded-lg shadow-md mt-20 min-h-screen">
          <div className="py-8">
          <h2 className="text-lg font-medium text-gray-900">Update Profile Details</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={ProfileViewSchema}
          >
            {({ values }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  {/* TSC File Number */}
                  <div>
                    <label
                      htmlFor="tscFileNumber"
                      className="block text-l font-medium text-gray-900"
                    >
                      TSC File Number
                    </label>
                    <Field
                      id="tscFileNumber"
                      name="tscFileNumber"
                      placeholder="Enter TSC File Number"
                      className="input-field"
                    />
                    <ErrorMessage
                      name="tscFileNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                     {/* School of Previous Posting */}
                     <div>
                    <label
                      htmlFor="schoolOfPreviousPosting"
                      className="block text-l font-medium text-gray-900"
                    >
                      School of Previous Posting
                    </label>
                    <Select<SelectOption>
                      name="schoolOfPreviousPosting"
                      id="schoolOfPreviousPosting"
                      options={schoolOptions}
                      value={schoolOptions.find(
                        (option) => option.value === selectedSchoolOfPreviousPosting
                      )}
                      onChange={handleSelectChange(setSelectedSchoolOfPreviousPosting)}
                      className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Select School of Previous Posting"
                      isSearchable
                      isClearable
                      required
                    />
                  </div>

                  {/* School of Present Posting */}
                  <div>
                    <label
                      htmlFor="schoolOfPresentPosting"
                      className="block text-l font-medium text-gray-900"
                    >
                      School of Present Posting
                    </label>
                    <Select<SelectOption>
                      name="schoolOfPresentPosting"
                      id="schoolOfPresentPosting"
                      options={schoolOptions}
                      value={schoolOptions.find(
                        (option) => option.value === selectedSchoolOfPresentPosting
                      )}
                      onChange={handleSelectChange(setSelectedSchoolOfPresentPosting)}
                      className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Select School of Present Posting"
                      isSearchable
                      isClearable
                      required
                    />
                  </div>

                  {/* Additional Fields */}
                  <div>
                    <label htmlFor="zone" className="block text-l font-medium text-gray-900">
                      Zone
                    </label>
                    <Select<SelectOption>
                      name="zones"
                      id="zones"
                      options={zoneOptions}
                      value={zoneOptions.find(
                        (option) => option.value === selectedZone
                      )}
                      onChange={handleSelectChange(setSelectedZone)}
                      className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Select Zone of Present School Posting"
                      isSearchable
                      isClearable
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="division" className="block text-l font-medium text-gray-900">
                      Division
                    </label>
                    <Select<SelectOption>
                      id="division"
                      name="division"
                      options={divisionOptions}
                      value={divisionOptions.find((option) => option.value === selectedDivision)}
                      onChange={handleSelectChange(setSelectedDivision)}
                      className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter Division"
                      isSearchable
                      isClearable
                      required
                    />
                    
                  </div>


 {/* Additional Fields */}
 <div>
                    <label htmlFor="stateOfOrigin" className="block text-l font-medium text-gray-900">
                      State of Origin
                    </label>
                    <Select<SelectOption>
                      name="stateOfOrigin"
                      id="stateOfOrigin"
                      options={stateOptions}
                      value={stateOptions.find(
                        (option) => option.value === selectedState
                      )}
                      onChange={handleSelectChange(setSelectedState)}
                      className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Select Zone of Present School Posting"
                      isSearchable
                      isClearable
                      required
                    />
                  </div>

                  
                  <FieldArray name="subjectsTaught">
  {({ remove, push }) => (
    <>
      {values.subjectsTaught.length > 0 &&
        values.subjectsTaught.map((_, index) => (
          <div key={index} className="subjectsTaught-field-group">
            <div>
              <label
                htmlFor={`subjectsTaught.${index}`}
                className="block text-l font-medium text-gray-900"
              >
                Subject Taught
              </label>
              <CreatableSelect<SelectOption | string>
                name={`subjectsTaught.${index}`}
                id="subjectsTaught"
                options={subjectsTaughtOptions}
                value={subjectsTaughtOptions.find(
                  (option) => option.value === selectedSubjectTaught
                )}
                onCreateOption={(inputValue) => {
                  const newOption = { value: inputValue, label: inputValue };
                  setSelectedSubjectsTaught(inputValue);
                  subjectsTaught.push(newOption.value);
                }}
                className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search or Select Subject Taught"
                isSearchable
                isClearable
                required
              />
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white px-1 py-1 rounded-md mt-2"
            >
              Remove
            </button>
          </div>
        ))}

      <button
        type="button"
        onClick={() =>
          push({subjectsTaught: ""})
        }
        className="bg-indigo-500 text-white px-1 py-1 rounded-md"
      >
        Add Subjects Taught
      </button>
    </>
  )}
</FieldArray>

                


                  {/* Qualifications Field Array */}
                  <FieldArray name="qualifications">
  {({ remove, push }) => (
    <>
      {values.qualifications.length > 0 &&
        values.qualifications.map((_, index) => (
          <div key={index} className="qualification-field-group">
            <div>
              <label
                htmlFor={`qualifications.${index}.schoolName`}
                className="block text-l font-medium text-gray-900"
              >
                School Name
              </label>
              <CreatableSelect<SelectOption | string>
                name={`qualifications.${index}.schoolName`}
                id="schoolName"
                options={institutionNameOptions}
                value={institutionNameOptions.find(
                  (option) => option.value === selectedInstitution
                )}
                onCreateOption={(inputValue) => {
                  const newOption = { value: inputValue, label: inputValue };
                  setSelectedInstitution(inputValue);
                  institutions.push(newOption.value);
                }}
                className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search or Select Institution Name"
                isSearchable
                isClearable
                required
              />
            </div>

            <div>
              <label
                htmlFor={`qualifications.${index}.degreeType`}
                className="block text-l font-medium text-gray-900"
              >
                Degree Type
              </label>
              <Select<SelectOption>
                name={`qualifications.${index}.degreeType`}
                id="degreeType"
                options={qualificationOptions}
                value={qualificationOptions.find(
                  (option) => option.value === selectedQualification
                )}
                onChange={handleSelectChange(setSelectedQualification)}
                className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search or Select Qualification"
                isSearchable
                isClearable
                required
              />
            </div>

            <div>
              <label
                htmlFor={`qualifications.${index}.specialization`}
                className="block text-l font-medium text-gray-900"
              >
                Specialization
              </label>
              <CreatableSelect<SelectOption>
                name={`qualifications.${index}.specialization`}
                id="specialization"
                options={specializationOptions}
                value={specializationOptions.find(
                  (option: any) => option.value === selectedSpecialization
                )}
                onCreateOption={(inputValue) => {
                  const newOption = { value: inputValue, label: inputValue };
                  setSelectedSpecialization(inputValue);
                  specializationOptions.push(newOption);
                }}
                onChange={handleSelectChange(setSelectedSpecialization)}
                className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search or Select Specialization"
                isSearchable
                isClearable
                required
              />
            </div>



            <div>
              <label
                htmlFor={`qualifications.${index}.startYear`}
                className="block text-l font-medium text-gray-900"
              >
                Start Year
              </label>
              <Select<SelectOption>
                name={`qualifications.${index}.startYear`}
                id="startYear"
                options={startYearOptions}
                value={startYearOptions.find(
                  (option) => option.value === selectedStartYear
                )}
                onChange={handleSelectChange(setSelectedStartYear)}
                className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Select Start Year"
                isSearchable
                isClearable
                required
              />

              <label
                htmlFor={`qualifications.${index}.endYear`}
                className="block text-l font-medium text-gray-900"
              >
               End Year
              </label>
              <Select<SelectOption>
                name={`qualifications.${index}.endYear`}
                id="degreeType"
                options={endYearOptions}
                value={endYearOptions.find(
                  (option) => option.value === selectedEndYear
                )}
                onChange={handleSelectChange(setSelectedEndYear)}
                className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Select End Year"
                isSearchable
                isClearable
                required
              />
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white px-1 py-1 rounded-md mt-2"
            >
              Remove
            </button>
          </div>
        ))}

      <button
        type="button"
        onClick={() =>
          push({
            degreeType: "",
            specialization: "",
            startYear: "",
            endYear: "",
            schoolName: ""
          })
        }
        className="bg-indigo-500 text-white px-1 py-1 rounded-md"
      >
        Add Qualification
      </button>
    </>
  )}
</FieldArray>

{/* PFA */}
        <div>
                    <label htmlFor="pfa" className="block text-l font-medium text-gray-900">
                      Pension Fund Administrator
                    </label>
                    <Select<SelectOption>
                      name="pfa"
                      id="pfa"
                      options={pfaOptions}
                      value={pfaOptions.find(
                        (option) => option.value === selectedPFA
                      )}
                      onChange={handleSelectChange(setSelectedPFA)}
                      className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Select Pension Fund Administrator"
                      isSearchable
                      isClearable
                      required
                    />
                  </div>




                  {/* More fields go here... */}
                  {/* PFA Number */}
                  <div>
                    <label
                      htmlFor="pfaNumber"
                      className="block text-l font-medium text-gray-900"
                    >
                      PFA Number
                    </label>
                    <Field
                      id="pfaNumber"
                      name="pfaNumber"
                      placeholder="Enter PFA Number"
                      className="input-field"
                      required
                    />
                    <ErrorMessage
                      name="pfaNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>


                  {/* Submit Button */}
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                      Update Profile
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          </div>
        </div>
      {/* ) : (
        <LogoLoader />
      )} */}
    </>
  );
};

export default ProfileUpdatePage;
