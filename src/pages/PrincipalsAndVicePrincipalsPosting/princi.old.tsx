// import React, { useState, useEffect } from "react";
// import Select, { SingleValue } from "react-select";
// import { ISchools, IUser } from "types";
// import { postPrincipalsAndVicePrincipals } from "../../services/schools.service";
// import { toast } from "react-toastify";
// import { Navbar } from "components";

// type PostingFormProps = {
//   schools: ISchools[];
//   staff: IUser[];
// };

// interface SelectOption {
//   value: string;
//   label: string;
// }

// export const PrincipalsAndVicePrincipalsView: React.FC<PostingFormProps> = ({
//   schools,
//   staff,
// }) => {
//   const [selectedDestinationSchool, setSelectedDestinationSchool] =
//     useState<string | null>(null);
//   const [selectedPrincipal, setSelectedPrincipal] = useState<string | null>(
//     null
//   );
//   const [selectedVicePrincipalAdmin, setSelectedVicePrincipalAdmin] =
//     useState<string | null>(null);
//   const [selectedVicePrincipalAcademics, setSelectedVicePrincipalAcademics] =
//     useState<string | null>(null);
//   const [destinationSchoolDetails, setDestinationSchoolDetails] =
//     useState<ISchools | null>(null);
//   const [destinationSchoolStaff, setDestinationSchoolStaff] = useState<IUser[]>(
//     []
//   );

//   useEffect(() => {
//     if (selectedDestinationSchool) {
//       console.log(destinationSchoolStaff);
//       const schoolDetails =
//         schools.find((school) => school._id === selectedDestinationSchool) ??
//         null;
//       setDestinationSchoolDetails(schoolDetails);
//       const schoolStaff = staff.filter(
//         (user) => user.schoolOfPresentPosting?._id === selectedDestinationSchool
//       );
//       setDestinationSchoolStaff(schoolStaff);
//     } else {
//       setDestinationSchoolDetails(null);
//       setDestinationSchoolStaff([]);
//     }
//   }, [selectedDestinationSchool, schools, staff]);

//   const handleSubmit = async () => {
//     if (!selectedDestinationSchool) {
//       toast.error("Please select a destination school.");
//       return;
//     }

//     const selectedValues = [
//       selectedPrincipal,
//       selectedVicePrincipalAdmin,
//       selectedVicePrincipalAcademics,
//     ].filter(Boolean);

//     const hasDuplicates = new Set(selectedValues).size !== selectedValues.length;

//     if (hasDuplicates) {
//       toast.error("Please ensure all selections are unique.");
//       return;
//     }

//     try {
//       await postPrincipalsAndVicePrincipals({
//         principal: selectedPrincipal ?? "",
//         vicePrincipalAdmin: selectedVicePrincipalAdmin ?? "",
//         vicePrincipalAcademics: selectedVicePrincipalAcademics ?? "",
//         schoolId: selectedDestinationSchool,
//       });

//       toast.success("Staff posted successfully!");

//       // Reset state
//       setSelectedDestinationSchool(null);
//       setSelectedPrincipal(null);
//       setSelectedVicePrincipalAdmin(null);
//       setSelectedVicePrincipalAcademics(null);
//     } catch (error) {
//       toast.error(
//         error instanceof Error
//           ? error.message
//           : "An error occurred while posting staff."
//       );
//     }
//   };
//   const schoolOptions: SelectOption[] = schools
//     .filter((school) => school._id) // Ensure _id exists
//     .map((school) => ({
//       value: school._id ?? "", // Provide a fallback empty string if _id is undefined
//       label: `${school?.nameOfSchool} ${school?.category}`,
//     }));

//   const staffOptions: SelectOption[] = staff
//     .filter((member) => member._id) // Ensure _id exists
//     .map((member) => (
//       {

//       value: member._id ?? "", // Provide a fallback empty string if _id is undefined
//       label: `${member?.staffName?.firstName} ` ,
//     }));

//     const handleSelectChange =
//     (setter: React.Dispatch<React.SetStateAction<string | null>>) =>
//     (selectedOption: SingleValue<SelectOption>) => {
//       const newValue = selectedOption ? selectedOption.value : null;

//       // Ensure uniqueness
//       const selectedValues = [
//         selectedDestinationSchool,
//         selectedPrincipal,
//         selectedVicePrincipalAdmin,
//         selectedVicePrincipalAcademics,
//       ].filter(Boolean);

//       if (newValue && selectedValues.includes(newValue)) {
//         toast.error("The selected value must be unique. Please choose a different option.");
//         return;
//       }

//       setter(newValue);
//     };

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-row pt-6 gap-4 px-4">
//         {/* Form Container */}
//         <div className="flex-1 p-6 bg-green-500 rounded-lg shadow-lg mt-16">
//           <h2 className="text-xl font-bold mb-6 text-black">
//             Post Principals & Vice Principals
//           </h2>

//           {/* Destination School Selection */}
//           <div className="mb-6">
//             <label
//               htmlFor="destinationSchool"
//               className="block text-lg font-medium text-black mb-2"
//             >
//               Destination School
//             </label>
//             <Select<SelectOption>
//               id="destinationSchool"
//               options={schoolOptions}
//               value={
//                 schoolOptions.find(
//                   (option) => option.value === selectedDestinationSchool
//                 ) ?? null
//               }
//               onChange={handleSelectChange(setSelectedDestinationSchool)}
//               className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Select Destination School"
//               isSearchable
//               isClearable // Allows clearing the selection

//             />
//           </div>

//           {/* Principal Selection */}
//           <div className="mb-6">
//             <label
//               htmlFor="principal"
//               className="block text-lg font-medium text-black mb-2"
//             >
//               Principal
//             </label>
//             <Select<SelectOption>
//               id="principal"
//               options={staffOptions}
//               value={
//                 staffOptions.find((option) => option.value === selectedPrincipal) ?? null
//               }
//               onChange={handleSelectChange(setSelectedPrincipal)}
//               className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Select Principal"
//               isSearchable
//               isClearable // Allows clearing the selection
//             />
//           </div>

//           {/* Vice Principal (Admin) Selection */}
//           <div className="mb-6">
//             <label
//               htmlFor="vicePrincipalAdmin"
//               className="block text-lg font-medium text-black mb-2"
//             >
//               Vice Principal (Admin)
//             </label>
//             <Select<SelectOption>
//               id="vicePrincipalAdmin"
//               options={staffOptions}
//               value={
//                 staffOptions.find(
//                   (option) => option.value === selectedVicePrincipalAdmin
//                 ) ?? null
//               }
//               onChange={handleSelectChange(setSelectedVicePrincipalAdmin)}
//               className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Select Vice Principal (Admin)"
//               isSearchable
//               isClearable // Allows clearing the selection
//             />
//           </div>

//           {/* Vice Principal (Academics) Selection */}
//           <div className="mb-6">
//             <label
//               htmlFor="vicePrincipalAcademics"
//               className="block text-lg font-medium text-black mb-2"
//             >
//               Vice Principal (Academics)
//             </label>
//             <Select<SelectOption>
//               id="vicePrincipalAcademics"
//               options={staffOptions}
//               value={
//                 staffOptions.find(
//                   (option) => option.value === selectedVicePrincipalAcademics
//                 ) ?? null
//               }
//               onChange={handleSelectChange(setSelectedVicePrincipalAcademics)}
//               className="block w-full text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Select Vice Principal (Academics)"
//               isSearchable
//               isClearable // Allows clearing the selection
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               // eslint-disable-next-line @typescript-eslint/no-misused-promises
//               onClick={handleSubmit}
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//             >
//               Post Staff
//             </button>
//           </div>
//         </div>

//         {/* Right Div: Display School Details */}
//         <div className="flex-1 p-6 bg-black rounded-lg shadow-lg mt-16 overflow-auto max-h-[550px]">
//   <div className="flex flex-col items-center">
//   <h2 className="text-xl font-bold mb-6 text-yellow-300  justify-center">
//     {destinationSchoolDetails ? `${destinationSchoolDetails.nameOfSchool}` : "Select a school"}
//   </h2>
//   </div>
//   {destinationSchoolDetails ? (
//     <div className="space-y-4">
//       <div className="flex flex-row text-white gap-4">
//         <p><strong className="text-green-400">Category: </strong> {destinationSchoolDetails.category }</p>
//         <p><strong className="text-green-400">Zone: </strong> {destinationSchoolDetails.zone }</p>
//         <p><strong className="text-green-400">Location: </strong> {destinationSchoolDetails.location}</p>
//       </div>

//       {destinationSchoolDetails.principal ? (
//         <div className="text-white mt-4">
//           <h3 className="text-xl font-semibold text-yellow-300">Principal Details:</h3>
//           <p><strong className="text-green-400">Name:</strong> {destinationSchoolDetails.principal.staffName.firstName} {destinationSchoolDetails.principal.staffName.lastName}</p>
//           <p><strong className="text-green-400">Position:</strong> {destinationSchoolDetails.principal.position}</p>
//           <p><strong className="text-green-400">Gender:</strong> {destinationSchoolDetails.principal.gender}</p>
//           <p><strong className="text-green-400">Phone:</strong> {destinationSchoolDetails.principal.phoneNumber}</p>
//           <p><strong className="text-green-400">OG Number:</strong> {destinationSchoolDetails.principal.ogNumber}</p>
//           <p><strong className="text-green-400">TSC File Number:</strong> {destinationSchoolDetails.principal.tscFileNumber}</p>
//         </div>
//       ) : (
//         <p className="text-yellow-400">No principal assigned to this school.</p>
//       )}
//       {destinationSchoolDetails.vicePrincipalAdmin ? (
//         <div className="text-white mt-4">
//           <h3 className="text-xl font-semibold text-yellow-300">Vice Principal (Admin) Details:</h3>
//           <p><strong className="text-green-400">Name:</strong> {destinationSchoolDetails.vicePrincipalAdmin.staffName.firstName} {destinationSchoolDetails.vicePrincipalAdmin.staffName.lastName}</p>
//           <p><strong className="text-green-400">Position:</strong> {destinationSchoolDetails.vicePrincipalAdmin.position}</p>
//           <p><strong className="text-green-400">Gender:</strong> {destinationSchoolDetails.vicePrincipalAdmin.gender}</p>
//           <p><strong className="text-green-400">Phone:</strong> {destinationSchoolDetails.vicePrincipalAdmin.phoneNumber}</p>
//           <p><strong className="text-green-400">OG Number:</strong> {destinationSchoolDetails.vicePrincipalAdmin.ogNumber}</p>
//           <p><strong className="text-green-400">TSC File Number:</strong> {destinationSchoolDetails.vicePrincipalAdmin.tscFileNumber}</p>
//         </div>
//       ) : (
//         <p className="text-yellow-400">No Vice Principal (Admin) assigned to this school.</p>
//       )}
//       {destinationSchoolDetails.vicePrincipalAcademics ? (
//         <div className="text-white mt-4">
//           <h3 className="text-xl font-semibold text-yellow-300">Vice Principal (Academics) Details:</h3>
//           <p><strong className="text-green-400">Name:</strong> {destinationSchoolDetails.vicePrincipalAcademics.staffName.firstName} {destinationSchoolDetails.vicePrincipalAcademics.staffName.lastName}</p>
//           <p><strong className="text-green-400">Position:</strong> {destinationSchoolDetails.vicePrincipalAcademics.position}</p>
//           <p><strong className="text-green-400">Gender:</strong> {destinationSchoolDetails.vicePrincipalAcademics.gender}</p>
//           <p><strong className="text-green-400">Phone:</strong> {destinationSchoolDetails.vicePrincipalAcademics.phoneNumber}</p>
//           <p><strong className="text-green-400">OG Number:</strong> {destinationSchoolDetails.vicePrincipalAcademics.ogNumber}</p>
//           <p><strong className="text-green-400">TSC File Number:</strong> {destinationSchoolDetails.vicePrincipalAcademics.tscFileNumber}</p>
//         </div>
//       ) : (
//         <p className="text-yellow-400">No Vice Principal (Academics) assigned to this school.</p>
//       )}
//        <ul className="list-disc pl-5 space-y-2">
//        <h3 className="text-xl font-semibold text-yellow-300">Staff Members:</h3>
//         {destinationSchoolDetails?.listOfStaff?.length > 0 ? (
//           destinationSchoolDetails?.listOfStaff?.map((staffMember) => (
//             <li key={staffMember?._id} className="text-white">
//               {staffMember?.staffName?.firstName} - {staffMember.position}
//             </li>
//           ))
//         ) : (
//           <li className="text-white">No staff members available.</li>
//         )}
//       </ul>
//     </div>
//   ) : (
//     <p className="text-white">Select a destination school to view principal details.</p>
//   )}
// </div>

//       </div>
//     </>
//   );
// // };
