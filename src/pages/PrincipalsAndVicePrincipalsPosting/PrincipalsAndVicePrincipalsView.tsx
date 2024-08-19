import { useState, useEffect } from "react";
import { ISchools, IUser } from "types";
import { fetchUsersFromAparticularSchool } from "../../services/schools.service";
import { toast } from "react-toastify";

type PostingFormProps = {
  schools: ISchools[];
  staff: IUser[];
  onSubmit: (
    selectedSchool: string,
    selectedPrincipal: string,
    selectedVicePrincipalAdmin: string,
    selectedVicePrincipalAcademics: string
  ) => void;
};

export const PrincipalsAndVicePrincipalsView: React.FC<PostingFormProps> = ({
  schools,

  onSubmit,
}) => {
  const [selectedSourceSchool, setSelectedSourceSchool] = useState<string>("");
  const [selectedDestinationSchool, setSelectedDestinationSchool] = useState<string>("");
  const [selectedPrincipal, setSelectedPrincipal] = useState<string>("");
  const [selectedVicePrincipalAdmin, setSelectedVicePrincipalAdmin] = useState<string>("");
  const [selectedVicePrincipalAcademics, setSelectedVicePrincipalAcademics] = useState<string>("");
  const [usersFromSchools, setUsersFromSchools] = useState<IUser[]>([]);

  useEffect(() => {
    if (selectedSourceSchool) {
      void loadUsersFromSchool(selectedSourceSchool);
    }
  }, [selectedSourceSchool]);

  const loadUsersFromSchool = async (schoolId: string) => {
    try {
      const fetchedUsers = await fetchUsersFromAparticularSchool(schoolId);
      setUsersFromSchools(fetchedUsers);
    } catch (error: any) {
      toast.error("Failed to load users from the selected school.");
    }
  };

  const handleSubmit = () => {
    onSubmit(
      selectedDestinationSchool,
      selectedPrincipal,
      selectedVicePrincipalAdmin,
      selectedVicePrincipalAcademics
    );
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Post Principals & Vice Principals</h2>

      {/* Source School Selection */}
      <div className="mb-4">
        <label htmlFor="sourceSchool" className="block text-md font-medium text-gray-700">
          Source School
        </label>
        <select
          id="sourceSchool"
          value={selectedSourceSchool}
          onChange={(e) => {setSelectedSourceSchool(e.target.value)}}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Source School</option>
          {schools?.map((school) => (
            <option key={school?._id} value={school?._id}>
              {school?.nameOfSchool} {school?.category}
            </option>
          ))}
        </select>
      </div>

      {/* Destination School Selection */}
      <div className="mb-4">
        <label htmlFor="destinationSchool" className="block text-md font-medium text-gray-700">
          Destination School
        </label>
        <select
          id="destinationSchool"
          value={selectedDestinationSchool}
          onChange={(e) => {setSelectedDestinationSchool(e.target.value)}}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Destination School</option>
          {schools?.map((school) => (
            <option key={school._id} value={school._id}>
              {school.nameOfSchool} {school.category}
            </option>
          ))}
        </select>
      </div>

      {/* Principal Selection */}
      <div className="mb-4">
        <label htmlFor="principal" className="block text-md font-medium text-gray-700">
          Principal
        </label>
        <select
          id="principal"
          value={selectedPrincipal}
          onChange={(e) => {setSelectedPrincipal(e.target.value)}}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Principal</option>
          {usersFromSchools?.map((user) => (
            <option key={user._id} value={user._id}>
              {user?.staffName?.firstName} {user?.staffName?.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Vice Principal (Admin) Selection */}
      <div className="mb-4">
        <label htmlFor="vicePrincipalAdmin" className="block text-md font-medium text-gray-700">
          Vice Principal (Admin)
        </label>
        <select
          id="vicePrincipalAdmin"
          value={selectedVicePrincipalAdmin}
          onChange={(e) => {setSelectedVicePrincipalAdmin(e.target.value)}}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Vice Principal (Admin)</option>
          {usersFromSchools?.map((user) => (
            <option key={user._id} value={user._id}>
              {user?.staffName?.firstName} {user?.staffName?.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Vice Principal (Academics) Selection */}
      <div className="mb-4">
        <label htmlFor="vicePrincipalAcademics" className="block text-md font-medium text-gray-700">
          Vice Principal (Academics)
        </label>
        <select
          id="vicePrincipalAcademics"
          value={selectedVicePrincipalAcademics}
          onChange={(e) => {setSelectedVicePrincipalAcademics(e.target.value)}}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-md border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select Vice Principal (Academics)</option>
          {usersFromSchools?.map((user) => (
            <option key={user._id} value={user._id}>
              {user?.staffName?.firstName} {user?.staffName?.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Post Staff
        </button>
      </div>
    </div>
  );
};
