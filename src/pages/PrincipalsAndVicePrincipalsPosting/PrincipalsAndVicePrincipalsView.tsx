import React, { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { ISchools, IUser } from "types";
import { postPrincipalsAndVicePrincipals } from "../../services/schools.service";
import { toast } from "react-toastify";
import { Navbar, Loader } from "components";
import LogoLoader from "../../components/widgets/loader/LogoLoader";


type PostingFormProps = {
  schools: ISchools[];
  staff: IUser[];
  // refreshData: () => Promise<void>;
};

interface SelectOption {
  value: string;
  label: string;
}

export const PrincipalsAndVicePrincipalsView: React.FC<PostingFormProps> = ({
  schools,
  staff,
  // refreshData
}) => {
  const [selectedStaleOrNew, setSelectedStaleOrNew] = useState<string | null>(null);
  const [selectedpreviousSchool, setSelecetdpreviousSchool] = useState<string | null>(null);
  const [selectedDestinationSchool, setSelectedDestinationSchool] = useState<string | null>(null);
  const [selectedPrincipal, setSelectedPrincipal] = useState<string | null>(null);
  const [selectedVicePrincipalAdmin, setSelectedVicePrincipalAdmin] = useState<string | null>(null);
  const [selectedVicePrincipalAcademics, setSelectedVicePrincipalAcademics] = useState<
    string | null
  >(null);
  const [destinationSchoolDetails, setDestinationSchoolDetails] = useState<ISchools | null>(null);
  const [destinationSchoolStaff, setDestinationSchoolStaff] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(destinationSchoolDetails);
    if (selectedDestinationSchool) {
      const schoolDetails =
      schools.find((school) => school._id === selectedDestinationSchool) ?? null;
      setDestinationSchoolDetails(schoolDetails);
      const schoolStaff = staff.filter(
        (user) => user.schoolOfPresentPosting?._id === selectedDestinationSchool
      );
      setDestinationSchoolStaff(schoolStaff);
    } else {
      setDestinationSchoolDetails(null);
      setDestinationSchoolStaff([]);
      setSelecetdpreviousSchool(null);
      setSelectedStaleOrNew(null);
    }
  }, [selectedDestinationSchool, schools, staff]);

 
    // if (selectedStaleOrNew) {
    //   const staleOrNewOptions =
    //     ["Stale", "New"].find((option) => option === selectedStaleOrNew) ?? null;
    //     console.log(staleOrNewOptions)
    //   setSelectedStaleOrNew(staleOrNewOptions);
    // }


  const handleSubmit = async () => {
    console.log(destinationSchoolStaff);

    if (!selectedpreviousSchool) {
      toast.error("Please select a previous school.");
      return;
    }
    if (!selectedDestinationSchool) {
      toast.error("Please select a destination school.");
      return;
    }
    if (!selectedStaleOrNew) {
      console.log(selectedStaleOrNew)
      toast.error("Please select Stale or New");
      return;
    }
    if (!selectedPrincipal && !selectedVicePrincipalAdmin && !selectedVicePrincipalAcademics) {
      toast.error("Please select at least one staff member.");
      return;
    }

    const selectedValues = [
      selectedStaleOrNew,
      selectedDestinationSchool,
      selectedPrincipal,
      selectedVicePrincipalAdmin,
      selectedVicePrincipalAcademics
    ].filter((value) => value !== null);

    const hasDuplicates = new Set(selectedValues).size !== selectedValues.length;

    if (hasDuplicates) {
      toast.error("Please ensure all selections are unique.");
      return;
    }

    try {
      setLoading(true);
      await postPrincipalsAndVicePrincipals({
        previousSchool: selectedpreviousSchool ?? "",
        staleOrNew: selectedStaleOrNew ?? "",
        principal: selectedPrincipal ?? "",
        vicePrincipalAdmin: selectedVicePrincipalAdmin ?? "",
        vicePrincipalAcademics: selectedVicePrincipalAcademics ?? "",
        schoolId: selectedDestinationSchool
      });



      // Update the local state to reflect the changes
      const updatedSchoolDetails =
        schools.find((school) => school._id === selectedDestinationSchool) ?? null;
      setDestinationSchoolDetails(updatedSchoolDetails);
      const updatedSchoolStaff = staff.filter(
        (user) => user.schoolOfPresentPosting?._id === selectedDestinationSchool
      );
      setDestinationSchoolStaff(updatedSchoolStaff);
      // const updatedSaleOrNew = ["New", "Stale"].filter((option)=> option === selectedStaleOrNew)
      // console.log(updatedSaleOrNew)
      // setSelectedStaleOrNew(updatedSaleOrNew as any)
      setLoading(false);
      setTimeout(() => {
        toast.success(`Staff posted successfully`);
      }, 2000);
      // await refreshData();
      // Reset selection states
      setSelectedStaleOrNew(null);
      setSelecetdpreviousSchool(null);
      setSelectedPrincipal(null);
      setSelectedVicePrincipalAdmin(null);
      setSelectedVicePrincipalAcademics(null);
    } catch (error) {
      setLoading(false);
      toast.error(
        error instanceof Error ? error.message : "An error occurred while posting staff."
      );
    }
  };
  const staleOrNewOptions: SelectOption[] = ["New", "Stale"]
    .filter((option, index) => option[index])
    .map((option) => ({
      value: option ?? "",
      label: `${option}`
    }));

  const schoolOptions: SelectOption[] = schools
    .filter((school) => school._id) // Ensure _id exists
    .map((school) => ({
      value: school._id ?? "", // Provide a fallback empty string if _id is undefined
      label: `${school?.nameOfSchool} ${school?.category} ${school?.location}`
    }));

  const staffOptions: SelectOption[] = staff
    .filter((member) => member._id) // Ensure _id exists
    .map((member) => ({
      value: member._id ?? "", // Provide a fallback empty string if _id is undefined
      label: `${member?.staffName?.firstName}`
    }));

  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<string | null>>) =>
    async (selectedOption: SingleValue<SelectOption>) => {
      const newValue = selectedOption ? selectedOption.value : null;
      setter(newValue);

    };

  const selectedSchoolDetails = selectedDestinationSchool
    ? schools.find((school) => school._id === selectedDestinationSchool)
    : null;

  // const selectedSchoolStaff = selectedDestinationSchool
  //   ? staff.filter((user) => user.schoolOfPresentPosting?._id === selectedDestinationSchool)
  //   : [];

  return (
    <>
      <Navbar />
      {!loading ? 
      (<div className="flex flex-row pt-6 gap-4 px-4">
        {/* Form Container */}
        <div className="flex-1 p-6 bg-green-500 rounded-lg shadow-lg mt-16">
          <h2 className="text-xl font-bold mb-6 text-black">Post Principals & Vice Principals</h2>

          {/* stale OR new selection */}
          <div className="mb-6">
            <label htmlFor="staleOrNew" className="block text-lg font-medium text-black mb-2">
              Stale or New
            </label>
            <Select<SelectOption>
              id="staleOrNew"
              options={staleOrNewOptions}
              value={staleOrNewOptions.find((option) => option.value === selectedStaleOrNew)}
              onChange={handleSelectChange(setSelectedStaleOrNew)}
              className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Stale or New"
              isSearchable
              isClearable
            />
          </div>

          {/* Previous School Selection */}
          <div className="mb-6">
            <label htmlFor="previousSchool" className="block text-lg font-medium text-black mb-2">
              Previous School
            </label>
            <Select<SelectOption>
              id="previousSchool"
              options={schoolOptions}
              value={
                schoolOptions.find((option) => option.value === selectedpreviousSchool) ?? null
              }
              onChange={handleSelectChange(setSelecetdpreviousSchool)}
              className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Select Destination School"
              isSearchable
              isClearable
            />
          </div>

          {/* Destination School Selection */}
          <div className="mb-6">
            <label
              htmlFor="destinationSchool"
              className="block text-lg font-medium text-black mb-2"
            >
              Destination School
            </label>
            <Select<SelectOption>
              id="destinationSchool"
              options={schoolOptions}
              value={
                schoolOptions.find((option) => option.value === selectedDestinationSchool) ?? null
              }
              onChange={handleSelectChange(setSelectedDestinationSchool)}
              className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Select Destination School"
              isSearchable
              isClearable
            />
          </div>

          {/* Principal Selection */}
          <div className="mb-6">
            <label htmlFor="principal" className="block text-lg font-medium text-black mb-2">
              Principal
            </label>
            <Select<SelectOption>
              id="principal"
              options={staffOptions}
              value={staffOptions.find((option) => option.value === selectedPrincipal) ?? null}
              onChange={handleSelectChange(setSelectedPrincipal)}
              className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Select Principal"
              isSearchable
              isClearable
            />
          </div>

          {/* Vice Principal (Admin) Selection */}
          <div className="mb-6">
            <label
              htmlFor="vicePrincipalAdmin"
              className="block text-lg font-medium text-black mb-2"
            >
              Vice Principal (Admin)
            </label>
            <Select<SelectOption>
              id="vicePrincipalAdmin"
              options={staffOptions}
              value={
                staffOptions.find((option) => option.value === selectedVicePrincipalAdmin) ?? null
              }
              onChange={handleSelectChange(setSelectedVicePrincipalAdmin)}
              className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Select Vice Principal (Admin)"
              isSearchable
              isClearable
            />
          </div>

          {/* Vice Principal (Academics) Selection */}
          <div className="mb-6">
            <label
              htmlFor="vicePrincipalAcademics"
              className="block text-lg font-medium text-black mb-2"
            >
              Vice Principal (Academics)
            </label>
            <Select<SelectOption>
              id="vicePrincipalAcademics"
              options={staffOptions}
              value={
                staffOptions.find((option) => option.value === selectedVicePrincipalAcademics) ??
                null
              }
              onChange={handleSelectChange(setSelectedVicePrincipalAcademics)}
              className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Select Vice Principal (Academics)"
              isSearchable
              isClearable
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              {loading ? <Loader></Loader> : "Post Staff"}
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 bg-black rounded-lg shadow-lg mt-16 overflow-auto">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-6 text-yellow-300  justify-center">
              {selectedSchoolDetails ? `${selectedSchoolDetails.nameOfSchool}` : "Select a school"}
            </h2>
          </div>
          {selectedSchoolDetails ? (
            <div className="space-y-4">
              <div className="flex flex-row text-white gap-4">
                <p>
                  <strong className="text-green-400">Category: </strong>{" "}
                  {selectedSchoolDetails.category}
                </p>
                <p>
                  <strong className="text-green-400">Zone: </strong> {selectedSchoolDetails.zone}
                </p>
                <p>
                  <strong className="text-green-400">Location: </strong>{" "}
                  {selectedSchoolDetails.location}
                </p>
              </div>

              {selectedSchoolDetails.principal ? (
                <div className="text-white mt-4">
                  <h3 className="text-xl font-semibold text-yellow-300">Principal Details:</h3>
                  <p>
                    <strong className="text-green-400">Name:</strong>{" "}
                    {selectedSchoolDetails.principal.staffName.firstName}{" "}
                    {selectedSchoolDetails.principal.staffName.lastName}
                  </p>
                  <p>
                    <strong className="text-green-400">Position:</strong>{" "}
                    {selectedSchoolDetails.principal.position}
                  </p>
                  <p>
                    <strong className="text-green-400">Gender:</strong>{" "}
                    {selectedSchoolDetails.principal.gender}
                  </p>
                  <p>
                    <strong className="text-green-400">Phone:</strong>{" "}
                    {selectedSchoolDetails.principal.phoneNumber}
                  </p>
                  <p>
                    <strong className="text-green-400">OG Number:</strong>{" "}
                    {selectedSchoolDetails.principal.ogNumber}
                  </p>
                  <p>
                    <strong className="text-green-400">TSC File Number:</strong>{" "}
                    {selectedSchoolDetails.principal.tscFileNumber}
                  </p>
                </div>
              ) : (
                <p className="text-yellow-400">No principal assigned to this school.</p>
              )}
              {selectedSchoolDetails.vicePrincipalAdmin ? (
                <div className="text-white mt-4">
                  <h3 className="text-xl font-semibold text-yellow-300">
                    Vice Principal (Admin) Details:
                  </h3>
                  <p>
                    <strong className="text-green-400">Name:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAdmin.staffName.firstName}{" "}
                    {selectedSchoolDetails.vicePrincipalAdmin.staffName.lastName}
                  </p>
                  <p>
                    <strong className="text-green-400">Position:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAdmin.position}
                  </p>
                  <p>
                    <strong className="text-green-400">Gender:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAdmin.gender}
                  </p>
                  <p>
                    <strong className="text-green-400">Phone:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAdmin.phoneNumber}
                  </p>
                  <p>
                    <strong className="text-green-400">OG Number:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAdmin.ogNumber}
                  </p>
                  <p>
                    <strong className="text-green-400">TSC File Number:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAdmin.tscFileNumber}
                  </p>
                </div>
              ) : (
                <p className="text-yellow-400">
                  No Vice Principal (Admin) assigned to this school.
                </p>
              )}
              {selectedSchoolDetails.vicePrincipalAcademics ? (
                <div className="text-white mt-4">
                  <h3 className="text-xl font-semibold text-yellow-300">
                    Vice Principal (Academics) Details:
                  </h3>
                  <p>
                    <strong className="text-green-400">Name:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAcademics.staffName.firstName}{" "}
                    {selectedSchoolDetails.vicePrincipalAcademics.staffName.lastName}
                  </p>
                  <p>
                    <strong className="text-green-400">Position:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAcademics.position}
                  </p>
                  <p>
                    <strong className="text-green-400">Gender:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAcademics.gender}
                  </p>
                  <p>
                    <strong className="text-green-400">Phone:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAcademics.phoneNumber}
                  </p>
                  <p>
                    <strong className="text-green-400">OG Number:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAcademics.ogNumber}
                  </p>
                  <p>
                    <strong className="text-green-400">TSC File Number:</strong>{" "}
                    {selectedSchoolDetails.vicePrincipalAcademics.tscFileNumber}
                  </p>
                </div>
              ) : (
                <p className="text-yellow-400">
                  No Vice Principal (Academics) assigned to this school.
                </p>
              )}
              <ul className="list-disc pl-5 space-y-2">
                <h3 className="text-xl font-semibold text-yellow-300">Staff Members:</h3>
                {selectedSchoolDetails.listOfStaff?.length > 0 ? (
                  selectedSchoolDetails?.listOfStaff.map((staffMember) => (
                    <li key={staffMember?._id} className="text-white">
                      {staffMember?.staffName?.firstName} - {staffMember.position}
                    </li>
                  ))
                ) : (
                  <li className="text-white">No staff members available.</li>
                )}
              </ul>
            </div>
          ) : (
            <p className="text-white">Select a destination school to view principal details.</p>
          )}
        </div>
      </div>) : <LogoLoader /> }
    </>
  );
};
