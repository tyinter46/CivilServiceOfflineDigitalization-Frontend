import { useState, useEffect } from "react";
import { ISchools, IUser } from "types";
import { postPrincipalsAndVicePrincipals } from "../../services/schools.service";
import { toast } from "react-toastify";
import { Navbar } from "components";
// import { getLongDate } from "utils";

type PostingFormProps = {
  schools: ISchools[];
  staff: IUser[];
};

export const PrincipalsAndVicePrincipalsView: React.FC<PostingFormProps> = ({ schools, staff }) => {
  const [selectedDestinationSchool, setSelectedDestinationSchool] = useState<string>("");
  const [selectedPrincipal, setSelectedPrincipal] = useState<string>("");
  const [selectedVicePrincipalAdmin, setSelectedVicePrincipalAdmin] = useState<string>("");
  const [selectedVicePrincipalAcademics, setSelectedVicePrincipalAcademics] = useState<string>("");
  const [destinationSchoolDetails, setDestinationSchoolDetails] = useState<ISchools | null>(null);
  const [destinationSchoolStaff, setDestinationSchoolStaff] = useState<IUser[]>([]);

  useEffect(() => {
    if (selectedDestinationSchool) {
      const schoolDetails = schools.find((school) => school._id === selectedDestinationSchool);
      setDestinationSchoolDetails(schoolDetails ?? null);
  console.log(destinationSchoolStaff)
      const schoolStaff = staff.filter(
        (user) => user.schoolOfPresentPosting?._id === selectedDestinationSchool
      );
      setDestinationSchoolStaff(schoolStaff);
    } else {
      setDestinationSchoolDetails(null);
      setDestinationSchoolStaff([]);
    }
  }, [selectedDestinationSchool, schools, staff]);

  const handleSubmit = async () => {
    try {
      await postPrincipalsAndVicePrincipals({
        principal: selectedPrincipal,
        vicePrincipalAdmin: selectedVicePrincipalAdmin,
        vicePrincipalAcademics: selectedVicePrincipalAcademics,
        schoolId: selectedDestinationSchool,
      });

      toast.success("Staff posted successfully!");

      // Reset state
      setSelectedDestinationSchool("");
      setSelectedPrincipal("");
      setSelectedVicePrincipalAdmin("");
      setSelectedVicePrincipalAcademics("");
    } catch (error: any) {
      toast.error(error.message || "An error occurred while posting staff.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-row pt-10 gap-4 px-4">
        {/* Form Container */}
        <div className="flex-1 p-6 bg-green-500 rounded-lg shadow-lg mt-16">
          <h2 className="text-xl font-bold mb-6 text-black">Post Principals & Vice Principals</h2>

          {/* Destination School Selection */}
          <div className="mb-6">
            <label htmlFor="destinationSchool" className="block text-lg font-medium text-black mb-2">
              Destination School
            </label>
            <select
              id="destinationSchool"
              value={selectedDestinationSchool}
              onChange={(e) => setSelectedDestinationSchool(e.target.value)}
              className="block w-full h-12 pl-3 pr-10 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" className="text-lg ">
                Select Destination School
              </option>
              {schools?.map((school) => (
                <option key={school._id} value={school._id} className="text-lg">
                  {school.nameOfSchool} ({school.category})
                </option>
              ))}
            </select>
          </div>

          {/* Principal Selection */}
          <div className="mb-6">
            <label htmlFor="principal" className="block text-lg font-medium text-black mb-2">
              Principal
            </label>
            <select
              id="principal"
              value={selectedPrincipal}
              onChange={(e) => setSelectedPrincipal(e.target.value)}
              className="block w-full h-12 pl-3 pr-10 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" className="text-lg">
                Select Principal
              </option>
              {staff?.map((user) => (
                <option key={user?._id} value={user?._id} className="text-lg">
                  {user?.staffName?.firstName} {user?.staffName?.lastName} - {user?.position}
                </option>
              ))}
            </select>
          </div>

          {/* Vice Principal (Admin) Selection */}
          <div className="mb-6">
            <label htmlFor="vicePrincipalAdmin" className="block text-lg font-medium text-black mb-2">
              Vice Principal (Admin)
            </label>
            <select
              id="vicePrincipalAdmin"
              value={selectedVicePrincipalAdmin}
              onChange={(e) => setSelectedVicePrincipalAdmin(e.target.value)}
              className="block w-full h-12 pl-3 pr-10 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" className="text-lg text-white">
                Select Vice Principal (Admin)
              </option>
              {staff?.map((user) => (
                <option key={user._id} value={user._id} className="text-lg">
                  {user?.staffName?.firstName} {user?.staffName?.lastName} - {user?.position}
                </option>
              ))}
            </select>
          </div>

          {/* Vice Principal (Academics) Selection */}
          <div className="mb-6">
            <label htmlFor="vicePrincipalAcademics" className="block text-lg font-medium text-black mb-2">
              Vice Principal (Academics)
            </label>
            <select
              id="vicePrincipalAcademics"
              value={selectedVicePrincipalAcademics}
              onChange={(e) => setSelectedVicePrincipalAcademics(e.target.value)}
              className="block w-full h-12 pl-3 pr-10 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" className="text-lg text-white">
                Select Vice Principal (Academics)
              </option>
              {staff?.map((user) => (
                <option key={user._id} value={user._id} className="text-lg">
                  {user?.staffName?.firstName} {user?.staffName?.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                void handleSubmit();
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              Post Staff
            </button>
          </div>
        </div>

        {/* Right Div: Display School Details */}
<div className="flex-1 p-6 bg-black rounded-lg shadow-lg mt-16 overflow-auto max-h-[550px]">
  <div className="flex flex-col items-center">
  <h2 className="text-xl font-bold mb-6 text-yellow-300  justify-center">
    {destinationSchoolDetails ? `${destinationSchoolDetails.nameOfSchool}` : "Select a school"}
  </h2>
  </div>
  {destinationSchoolDetails ? (
    <div className="space-y-4">
      <div className="flex flex-row text-white gap-4">
        <p><strong className="text-green-400">Category: </strong> {destinationSchoolDetails.category }</p>
        <p><strong className="text-green-400">Zone: </strong> {destinationSchoolDetails.zone }</p>
        <p><strong className="text-green-400">Location: </strong> {destinationSchoolDetails.location}</p>
      </div>
        
      {destinationSchoolDetails.principal ? (
        <div className="text-white mt-4">
          <h3 className="text-xl font-semibold text-yellow-300">Principal Details:</h3>
          <p><strong className="text-green-400">Name:</strong> {destinationSchoolDetails.principal.staffName.firstName} {destinationSchoolDetails.principal.staffName.lastName}</p>
          <p><strong className="text-green-400">Position:</strong> {destinationSchoolDetails.principal.position}</p>
          <p><strong className="text-green-400">Gender:</strong> {destinationSchoolDetails.principal.gender}</p>
          <p><strong className="text-green-400">Phone:</strong> {destinationSchoolDetails.principal.phoneNumber}</p>
          <p><strong className="text-green-400">OG Number:</strong> {destinationSchoolDetails.principal.ogNumber}</p>
          <p><strong className="text-green-400">TSC File Number:</strong> {destinationSchoolDetails.principal.tscFileNumber}</p>
        </div>
      ) : (
        <p className="text-yellow-400">No principal assigned to this school.</p>
      )}
      {destinationSchoolDetails.vicePrincipalAdmin ? (
        <div className="text-white mt-4">
          <h3 className="text-xl font-semibold text-yellow-300">Vice Principal (Admin) Details:</h3>
          <p><strong className="text-green-400">Name:</strong> {destinationSchoolDetails.vicePrincipalAdmin.staffName.firstName} {destinationSchoolDetails.vicePrincipalAdmin.staffName.lastName}</p>
          <p><strong className="text-green-400">Position:</strong> {destinationSchoolDetails.vicePrincipalAdmin.position}</p>
          <p><strong className="text-green-400">Gender:</strong> {destinationSchoolDetails.vicePrincipalAdmin.gender}</p>
          <p><strong className="text-green-400">Phone:</strong> {destinationSchoolDetails.vicePrincipalAdmin.phoneNumber}</p>
          <p><strong className="text-green-400">OG Number:</strong> {destinationSchoolDetails.vicePrincipalAdmin.ogNumber}</p>
          <p><strong className="text-green-400">TSC File Number:</strong> {destinationSchoolDetails.vicePrincipalAdmin.tscFileNumber}</p>
        </div>
      ) : (
        <p className="text-yellow-400">No Vice Principal (Admin) assigned to this school.</p>
      )}
      {destinationSchoolDetails.vicePrincipalAcademics ? (
        <div className="text-white mt-4">
          <h3 className="text-xl font-semibold text-yellow-300">Vice Principal (Academics) Details:</h3>
          <p><strong className="text-green-400">Name:</strong> {destinationSchoolDetails.vicePrincipalAcademics.staffName.firstName} {destinationSchoolDetails.vicePrincipalAcademics.staffName.lastName}</p>
          <p><strong className="text-green-400">Position:</strong> {destinationSchoolDetails.vicePrincipalAcademics.position}</p>
          <p><strong className="text-green-400">Gender:</strong> {destinationSchoolDetails.vicePrincipalAcademics.gender}</p>
          <p><strong className="text-green-400">Phone:</strong> {destinationSchoolDetails.vicePrincipalAcademics.phoneNumber}</p>
          <p><strong className="text-green-400">OG Number:</strong> {destinationSchoolDetails.vicePrincipalAcademics.ogNumber}</p>
          <p><strong className="text-green-400">TSC File Number:</strong> {destinationSchoolDetails.vicePrincipalAcademics.tscFileNumber}</p>
        </div>
      ) : (
        <p className="text-yellow-400">No Vice Principal (Academics) assigned to this school.</p>
      )}
       <ul className="list-disc pl-5 space-y-2">
       <h3 className="text-xl font-semibold text-yellow-300">Staff Members:</h3>
        {destinationSchoolDetails?.listOfStaff?.length > 0 ? (
          destinationSchoolDetails?.listOfStaff?.map((staffMember) => (
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

      </div>
    </>
  );
};
