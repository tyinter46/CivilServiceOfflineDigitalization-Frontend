import React, { useState } from "react";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppSelector } from "hooks";
// import LogoLoader from "../../components/widgets/loader/Loader";

// import LogoLoader from "../../components/widgets/loader/LogoLoader";
// import { zones, subjectsTaught} from "./DropDownOptions";
import {
  institutions,
  Years,
  subjectsTaught,
  specializations,
  zones,
  PFA,
  states,
  professionalGradeLevel,
  nonProfessionalGradeLevel,
  teachingOrNonTeaching,
  cadre,
  graduateCadre,
  localGovernmentOfOrigin,
  wards,
  remoDivisionZones,
  ijebuDivisionZones,
  egbaDivisionZones,
  driverStorekeeperClerical,
  secreteriatAssistant,
  assistantChiefSecretariat,
  chiefSecretariat,
  assistantChiefSecretariatGradeLevel,
  chiefSecretariatGradeLevel,
  messengerAndWatchman,
  driverStorekeeperClericalGradeLevel,
  executiveOfficer,
  nceCadre,
  secretariatAssistantGradeLevel,
  messengerWatchmanGradeLevel,
  cleanerGradeLevel
} from "./DropDownOptions";

import { Calender, Navbar, TesCalendar, Loader } from "components";
import { UserDetails, ISchools } from "types";
// import { useAppSelector, useAppDispatch } from "hooks";

// Sample dropdown options
// const schoolOptions = [
//   { value: "School1", label: "School 1" },
//   { value: "School2", label: "School 2" },
// ];
// const zoneOptions = zones

// const yewaZoneOptions = yewaDivisionZones.map((option) => ({
//   value: option ?? "",
//   label: `${option}`
// }));

const zoneOptions = zones.map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

// const ijebuZoneOptions = ijebuDivisionZones.map((option) => ({
//   value: option ?? "",
//   label: `${option}`
// }));

// const remoZoneOptions = remoDivisionZones.map((option) => ({
//   value: option ?? "",
//   label: `${option}`
// }));

// const egbaZoneOptions = egbaDivisionZones.map((option) => ({
//   value: option ?? "",
//   label: `${option}`
// }));

interface PageProps {
  schools: ISchools[];
  onSubmit: Function;
  userDetails: UserDetails;
}

// const divisionOptions = ["EGBA", "IJEBU", "REMO", "YEWA"].map((option) => ({
//   value: option ?? "",
//   label: `${option}`
// }));

const egbaDivisionOption = ["EGBA"].map((option) => ({
  value: option ?? "",
  label: `${option}`
}));
const IjebuDivisionOption = ["IJEBU"].map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const remoDivisionOptions = ["REMO"].map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const yewaDivisionOptions = ["YEWA"].map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const CadreOptions = cadre.map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const professionalGradeLevelOptions = professionalGradeLevel.map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const nonProfessionalGradeLevelOptions = nonProfessionalGradeLevel.map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const secretariatAssistantGradeLevelOptions = secretariatAssistantGradeLevel.map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const assistantChiefSecretariatGradeLevelOptions = assistantChiefSecretariatGradeLevel.map((option) => ({
  value: option ?? "",
  label: `${option}`
}))

const chiefSecretariatGradeLevelOptions = chiefSecretariatGradeLevel.map((option) => ({
  value: option ?? "",
  label: `${option}`
}))

const driverStorekeeperClericalGradeLevelOptions = driverStorekeeperClericalGradeLevel.map(
  (option) => ({
    value: option ?? "",
    label: `${option}`
  })
);

const cleanerGradeLevelOptions = cleanerGradeLevel.map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const messengerWatchmanGradeLevelOptions = messengerWatchmanGradeLevel.map((option) => ({
  value: option ?? "",
  label: `${option}`
}));

const ProfileUpdatePage = ({ onSubmit, userDetails, schools }: PageProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // eslint-disable-line @typescript-eslint/consistent-indexed-object-style
  const [selectedDateOfPresentPosting, setSelectedDateOfPresentPosting] = useState<Date | null>(
    null
  );
  const [selectedDateOfLastPromotion, setSelectedDateOfLastPromotion] = useState<Date | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  console.log(user);

  const handleDateChange = (date: Date | null) => {
    setSelectedDateOfPresentPosting(date);
    const dateOfPresentSchoolPostingToString = date ? date.toLocaleDateString() : "";
    formValues.dateOfPresentSchoolPosting = dateOfPresentSchoolPostingToString;
  };
  const handleDateofLastPromotionChange = (date: Date | null) => {
    setSelectedDateOfLastPromotion(date);
    const dateOfLastPromotionToString = date ? date.toLocaleDateString() : "";
    formValues.dateOfLastPromotion = dateOfLastPromotionToString;
  };
  // console.log(userDetails?.user?._doc?.email)
  const [formValues, setFormValues] = useState({
    dateOfFirstAppointment: userDetails?.dateOfFirstAppointment,
    tscFileNumber: user?.user?.tscFileNumber,
    schoolOfPresentPosting: user?.user?.schoolOfPresentPosting?.nameOfSchool,
    schoolOfPreviousPosting: user?.user?.schoolOfPreviousPosting?.nameOfSchool,
    zone: user?.user?.zone || "",
    division: user?.user?.division || "",
    nationality: user?.user?.nationality || "",
    stateOfOrigin: user?.user?.stateOfOrigin || "",
    lgOfOrigin: user?.user?.lgOfOrigin || "",
    ward: user?.user?.ward || "",
    qualifications: userDetails?.qualifications ?? [],
    subjectsTaught: userDetails?.subjectsTaught ?? [],
    dateOfPresentSchoolPosting: user?.user?.dateOfPresentSchoolPosting,
    cadre: user?.user?.cadre || "",
    gradeLevel: userDetails?.gradeLevel || "",
    pfa: user?.user?.pfa || "",
    pensionNumber: user?.user?.pensionNumber || "",
    staffType: user?.user?.staffType,
    email: userDetails?.email || "",
    nameOfNextOfKin: user?.user?.nameOfNextOfKin ,
    nextOfKinAddress: user?.user?.nextOfKinAddress,
    nextOfKinPhoneNumber: user?.user?.nextOfKinPhoneNumber ,
    gender: user?.user?.gender ,
    residentialAddress: user?.user?.residentialAddress ,
    dateOfLastPromotion: user?.user?.dateOfLastPromotion
  });


  //       const subjectsTaughtOptions = subjectsTaught.map((option) => ({
  //       value: option,
  //       label: option,
  //     }));
  const wardOptions = wards.map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));
  const specializationOptions = specializations.map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));

  const localGovernmentOfOriginOptions = localGovernmentOfOrigin.map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));

  const staffType = teachingOrNonTeaching.map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));

  const qualificationOptions = [
    "FSLC",
    "SSCE",
    "NCE",
    "Bsc.",
    "BTech.",
    "Bed.",
    "B.A",
    "PGD",
    "ND",
    "HND",
    "Phd",
    "Able Bodied"
  ];

  const genderOptions = ["Male", "Female"].map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));



  const nationalityOptions = ["Nigerian"].map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));

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

  const stateOptions = states.map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));

  const pfaOptions = PFA.map((option) => ({
    value: option ?? "",
    label: `${option}`
  }));
  // Schema validation using Yup
  const ProfileViewSchema = Yup.object().shape({
    tscFileNumber: Yup.string()
    .matches(/^TSC\/(NTS|[NHG])\/\d{4,5}$/, "Invalid TSC File Number format. Expected formats: TSC/NTS/1234, TSC/N/1234, TSC/G/1234, or TSC/H/1234")
      .min(8, "tscFileNumber Too Short")
      .max(16, "File Number Too Long!")
      .required("Tsc File Number Required"),
    schoolOfPresentPosting: Yup.string().required("schoolOfPresentPosting Required"),
    schoolOfPreviousPosting: Yup.string().required("schoolOfPreviousPosting Required"),
    zone: Yup.string().min(3, "zone Too short!").required("zone Required"),
    division: Yup.string().required("Division required"),
    nationality: Yup.string().required("Nationality Required"),
    stateOfOrigin: Yup.string().required("stateOfOrigin Required"),
    lgOfOrigin: Yup.string().required("lgOfOrigin Required"),
    ward: Yup.string().required("ward Required"),
    qualifications: Yup.array().of(
      Yup.object().shape({
        degreeType: Yup.string().required("degreeType Required"),
        specialization: Yup.string().required("specialization Required"),
        startYear: Yup.string()
          .required("Start Year is Required")
          .test("valid-year", "Invalid Year", (value) => {
            const year = Number(value);
            return year >= 1900 && year <= new Date().getFullYear();
          }),
        endYear: Yup.string()
          .required("End Year is Required")
          .test("after-start-year", "End Year must be after Start Year", function (value) {
            const { startYear } = this.parent;
            return Number(value) > Number(startYear);
          }),
        schoolName: Yup.string().required("schoolName Required")
      })
    ),
    // dateOfPresentSchoolPosting: Yup.date().max(new Date(), "Cannot be in the future"),
    cadre: Yup.string().required("cadre Required"),
    gradeLevel: Yup.string().when("cadre", {
      is: (cadre: any) => !cadre,
      then: (schema) =>
        schema.test({
          name: "cadre-must-be-filled",
          exclusive: true,
          message: "Please fill Cadre first",
          test: () => false
        }),
      otherwise: (schema) => schema.required("Grade Level is Required")
    }),
    pfa: Yup.string().required("pfa Required"),
    pensionNumber: Yup.string().required("pensionNumber Required"),
    gender: Yup.string().required("gender Required")
    // professionalStatus: Yup.string().required("professionalStatus Required")
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
   
    e.preventDefault();
    
    console.log(formValues);
  
    try {
      setLoading(true)
      await ProfileViewSchema.validate(formValues, { abortEarly: true });
      setErrors({});
  
      if (formValues.subjectsTaught.length === 0) {
        toast.error("Kindly fill subject assigned field");
        setLoading(false)
        // setLoading(false)
        return;
      }
  
      if (formValues.qualifications.length === 0) {
        toast.error("Kindly fill qualifications field");
        // setLoading(false)
        setLoading(false)

        return;
      }
  
      onSubmit(formValues);
     
      
      console.log("Form submitted with values: ", formValues);
    } catch (validationErrors: any) {
      
      console.error("Validation errors: ", validationErrors);
  
      if (validationErrors.inner && validationErrors.inner.length > 0) {
        // Loop through all validation errors
        validationErrors.inner.forEach((error: any) => {
          toast.error(error.message); // Show each error message in a toast
          setLoading(false)
        });
      } else {
        // Handle single validation error
        toast.error(validationErrors.message || "Validation failed");
        setLoading(false)
      }
  
      // Collect errors to display them in the UI
      const errorMessages: { [key: string]: string } = {};
      if (validationErrors.inner) {
        validationErrors.inner.forEach((error: any) => {
          errorMessages[error.path] = error.message;
        });
      }
  
      setErrors(errorMessages);
    }
  };
  // if (loading) return <LogoLoader />;
  return (
    <>
      <Navbar />
      <div className="w-full max-w-4xl mx-auto my-2 bg-blue-100 p-6 rounded-lg shadow-md mt-20 min-h-screen">
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
                  required
                  name="tscFileNumber"
                  placeholder="Enter TSC File Number"
                  value={formValues.tscFileNumber}
                  onChange={handleInputChange}
                  className={`input-field border-gray-300 rounded-md ${
                    errors.tscFileNumber ? "border-red-500" : ""
                  }`}
                />
                {errors.tscFileNumber  && (
                  <span className="text-red-500 text-sm">{errors.tscFileNumber}</span>
                )
                }
              </div>

              {/* Teaching or Non Teaching */}
              <div>
                <label htmlFor="staffType" className="block text-l font-medium text-gray-900">
                  Teaching or Non-Teaching Staff
                </label>
                <Select
                  isClearable
                  required
                  options={staffType}
                  value={staffType.find((option) => option.value === formValues.staffType)}
                  onChange={handleSelectChange("staffType")}
                  placeholder="Select Teaching or Non-Teaching Staff"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="cadre" className="block text-l font-medium text-gray-900">
                  Gender
                </label>
                <Select
                  isClearable
                  required
                  options={genderOptions}
                  value={genderOptions.find((option) => option.value === formValues.gender)}
                  onChange={handleSelectChange("gender")}
                  placeholder="Select gender"
                />
              </div>

              {/* Cadre */}
              <div>
                <label htmlFor="cadre" className="block text-l font-medium text-gray-900">
                  Cadre
                </label>
                <Select
                  isClearable
                  required
                  options={CadreOptions}
                  value={CadreOptions.find((option) => option.value === formValues.cadre)}
                  onChange={handleSelectChange("cadre")}
                  placeholder="Select Cadre"
                />
              </div>

              {/* Grade Level  */}
              <div>
                <label htmlFor="gradeLevel" className="block text-l font-medium text-gray-900">
                  Grade Level
                </label>
                <Select
                  isClearable
                  required
                  isDisabled={!formValues.cadre}
                  options={
                    graduateCadre.includes(formValues.cadre)
                      ? professionalGradeLevelOptions
                      : nceCadre.includes(formValues.cadre)
                        ? nonProfessionalGradeLevelOptions
                        : secreteriatAssistant.includes(formValues.cadre)
                          ? secretariatAssistantGradeLevelOptions
                          : assistantChiefSecretariat.includes(formValues.cadre) 
                          ? assistantChiefSecretariatGradeLevelOptions
                          : chiefSecretariat.includes(formValues.cadre)
                          ? chiefSecretariatGradeLevelOptions
                          : executiveOfficer.includes(formValues.cadre)
                            ? nonProfessionalGradeLevelOptions
                            : messengerAndWatchman.includes(formValues.cadre)
                              ? messengerWatchmanGradeLevelOptions
                              : driverStorekeeperClerical.includes(formValues.cadre)
                                ? driverStorekeeperClericalGradeLevelOptions
                                : cleanerGradeLevelOptions
                  }
                  value={CadreOptions.find((option) => option.value === formValues.gradeLevel)}
                  onChange={handleSelectChange("gradeLevel")}
                  placeholder="Select Grade Level"
                />
              </div>

              {/* Date of last promotion */}
              <div className="flex flex-row">
                <label
                  htmlFor="dateOfLastPromotion"
                  className="block text-l font-medium text-gray-900"
                >
                  Date of Last Promotion
                </label>
                <TesCalendar></TesCalendar>{" "}
                <Calender
                  selectedDate={selectedDateOfLastPromotion}
                  onDateChange={handleDateofLastPromotionChange}
                  
                />
              </div>

              {/* Date of present school posting */}
              <div className="flex flex-row">
                <label
                  htmlFor="dateOfPresentSchoolPosting"
                  className="block text-l font-medium text-gray-900"
                >
                  Date of Present School Posting
                </label>
                <TesCalendar></TesCalendar>{" "}
                <Calender
                  selectedDate={selectedDateOfPresentPosting}
                  onDateChange={handleDateChange}
                  
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
                  required
                  options={schoolOptions}
                  value={ schoolOptions.find(
                    (option) => option.value === formValues.schoolOfPreviousPosting
                  )}
                  onChange={handleSelectChange("schoolOfPreviousPosting")}
                  placeholder="Select a school"
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
                  required
                  options={schoolOptions}
                  value={ schoolOptions.find(
                    (option) => option.value === formValues.schoolOfPresentPosting
                  ) }
                  onChange={handleSelectChange("schoolOfPresentPosting")}
                  placeholder="Select a school"
                />
              </div>
              {/* Zone */}
              <div>
                <label htmlFor="zone" className="block text-l font-medium text-gray-900">
                  Zone
                </label>
                <Select
                  isClearable
                  required
                  options={zoneOptions}
                  value={zoneOptions.find((option) => option.value === formValues.zone)}
                  onChange={handleSelectChange("zone")}
                  placeholder="Select or create a zone"
                />
              </div>

              {/* Division using CreatableSelect */}
              <div>
                <label htmlFor="division" className="block text-l font-medium text-gray-900">
                  Division
                </label>
                <Select
                  isDisabled={!formValues.zone}
                  required
                  options={
                    ijebuDivisionZones.includes(formValues.zone)
                      ? IjebuDivisionOption
                      : egbaDivisionZones.includes(formValues.zone)
                        ? egbaDivisionOption
                        : remoDivisionZones.includes(formValues.zone)
                          ? remoDivisionOptions
                          : yewaDivisionOptions
                  }
                  value={
                    ijebuDivisionZones.includes(formValues.zone)
                      ? IjebuDivisionOption
                      : egbaDivisionZones.includes(formValues.zone)
                        ? egbaDivisionOption
                        : remoDivisionZones.includes(formValues.zone)
                          ? remoDivisionOptions
                          : yewaDivisionOptions
                  }
                  onChange={handleSelectChange("division")}
                  placeholder="Select a division"
                />
              </div>

              <div>
                <label htmlFor="nationality" className="block text-l font-medium text-gray-900">
                  Nationality
                </label>
                <CreatableSelect
                  name="nationality"
                  id="nationality"
                  placeholder="Select or Create Nationality"
                  options={nationalityOptions}
                  value={
                    nationalityOptions.find(
                      (option) => option.value === formValues.nationality
                    ) ?? {
                      value: formValues.nationality,
                      label: formValues.nationality
                    }
                  }
                  onChange={handleSelectChange("nationality")}
                  className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  isSearchable
                  isClearable
                  required
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
                  value={
                    stateOptions.find((option) => option.value === formValues.stateOfOrigin) ?? {
                      value: formValues.stateOfOrigin,
                      label: formValues.stateOfOrigin
                    }
                  }
                  onChange={handleSelectChange("stateOfOrigin")}
                  className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Selec State of Origin"
                  isSearchable
                  isClearable
                  required
                />
              </div>

              <div>
                <label htmlFor="lgOfOrigin" className="block text-l font-medium text-gray-900">
                  Local Government of Origin
                </label>
                <CreatableSelect
                  name="lgOfOrigin"
                  id="lgOfOrigin"
                  options={localGovernmentOfOriginOptions}
                  value={
                    localGovernmentOfOriginOptions.find(
                      (option) => option.value === formValues.lgOfOrigin
                    ) ?? {
                      value: formValues.lgOfOrigin,
                      label: formValues.lgOfOrigin
                    }
                  }
                  onChange={handleSelectChange("lgOfOrigin")}
                  className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Select Local Government of Origin"
                  isSearchable
                  isClearable
                  required
                />
              </div>

              {/* Cadre */}
              <div>
                <label htmlFor="ward" className="block text-l font-medium text-gray-900">
                  Ward
                </label>
                <Select
                  isClearable
                  required
                  options={wardOptions}
                  value={wardOptions.find((option) => option.value === formValues.ward)}
                  onChange={handleSelectChange("ward")}
                  placeholder="Select Ward"
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
                    Subject Assinged 
                  </label>
                  <Select
                    isClearable
                    value={{ value: subject, label: subject }}
                    options={subjectsTaught.map((sub) => ({ value: sub, label: sub }))}
                    onChange={(selectedOption) => {
                      console.log(selectedOption?.value); 
                      const updatedSubjects = [...formValues.subjectsTaught]; 
                      updatedSubjects[index] = selectedOption ? selectedOption.value : "";

                      setFormValues({ ...formValues, subjectsTaught: updatedSubjects });
                    }}
                    placeholder="Select a subject"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubject(index)} // Implement the removeSubject function
                    className="bg-red-500 text-white px-1 py-1 rounded-md mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addSubject} // Implement the addSubject function
                className="bg-indigo-500 text-white px-1 py-1 rounded-md mt-4"
              >
                Click to Add Subjects Assigned
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
                    Qualification
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
                className="bg-green-700 text-white px-1 py-1 rounded-md mt-4"
              >
                Click to Add Qualifications
              </button>
              {/* PFA Number  & PFA */}
              <div>
                <label htmlFor="pfa" className="block text-l font-medium text-gray-900">
                  Pension Fund Administrator
                </label>
                <CreatableSelect
                  name="pfa"
                  id="pfa"
                  className="block w-full text-l border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="block w-full  text-l border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formValues.pensionNumber}
                  onChange={handleInputChange}
                  required
                  type="number"
                />
              </div>

              <div>
                <label
                  htmlFor="residentialAddress"
                  className="block text-l font-medium text-gray-900"
                >
                  Residential Address
                </label>
                <input
                  id="residentialAddress"
                  name="residentialAddress"
                  placeholder="Enter Residential Address"
                  className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formValues.residentialAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="nameOfNextOfKin" className="block text-l font-medium text-gray-900">
                  Name of Next of Kin
                </label>
                <input
                  id="nameOfNextOfKin"
                  name="nameOfNextOfKin"
                  placeholder="Enter Name of Next of Kin"
                  className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formValues.nameOfNextOfKin}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="nextOfKinAddress"
                  className="block text-l font-medium text-gray-900"
                >
                  Next of Kin Address
                </label>
                <input
                  id="nextOfKinAddress"
                  name="nextOfKinAddress"
                  placeholder="Enter Next of Kin Address"
                  className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formValues.nextOfKinAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="nextOfKinPhoneNumber"
                  className="block text-l font-medium text-gray-900"
                >
                  Next of Kin phone number
                </label>
                <input
                  id="nextOfKinPhoneNumber"
                  name="nextOfKinPhoneNumber"
                  placeholder="Enter Next of Kin Phone Number"
                  className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formValues.nextOfKinPhoneNumber}
                  onChange={handleInputChange}
                  type="number"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">
              {loading ? <Loader /> : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdatePage;
