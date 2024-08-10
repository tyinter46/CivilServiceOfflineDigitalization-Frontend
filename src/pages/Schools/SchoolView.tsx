import { Navbar } from "components";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchSchools } from "../../services/schools.service";
import { getLongDate } from "utils";
import LogoLoader from "components/widgets/loader/LogoLoader";

interface ISchools {
  _id?: string;
  nameOfSchool: string;
  category: string;
  address: string;
  location: string;
  zone: string;
  division: string;
  listOfStaff: any[];
  principal: any;
  vicePrincipalAdmin: any;
  vicePrincipalAcademics: any;
  latitude: string;
  longitude: string;
}

const ITEMS_PER_PAGE = 9;

export const SchoolView: React.FC = () => {
  const [schools, setSchools] = useState<ISchools[]>([]);
  const [openSchoolId, setOpenSchoolId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPrevNext, setShowPrevNext] = useState<boolean>(false);
  const [currentSchoolIndex, setCurrentSchoolIndex] = useState<number>(0);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        const fetchedSchools = await fetchSchools();
        setSchools(fetchedSchools);
      } catch (error) {
        setError("Failed to fetch schools");
      } finally {
        setLoading(false);
      }
    };

    void loadSchools();
  }, []);

  const handleToggle = (_id: string | undefined) => {
    if (_id) {
      setOpenSchoolId(openSchoolId === _id ? null : _id);
      setShowPrevNext(openSchoolId !== _id);
      if (openSchoolId !== _id) {
        const index = paginatedSchools.findIndex(school => school._id === _id);
        setCurrentSchoolIndex(index);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOpenSchoolId(null);
    setShowPrevNext(false);
    setCurrentSchoolIndex(0);
  };

  const handlePreviousSchool = () => {
    if (currentSchoolIndex > 0) {
      setCurrentSchoolIndex(currentSchoolIndex - 1);
      setOpenSchoolId(paginatedSchools[currentSchoolIndex - 1]._id ?? null);
    } else if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setCurrentSchoolIndex(ITEMS_PER_PAGE - 1);
      setOpenSchoolId(paginatedSchools[ITEMS_PER_PAGE - 1]._id ?? null);
    }
  };

  const handleNextSchool = () => {
    if (currentSchoolIndex < paginatedSchools.length - 1) {
      setCurrentSchoolIndex(currentSchoolIndex + 1);
      setOpenSchoolId(paginatedSchools[currentSchoolIndex + 1]._id ?? null);
    } else if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setCurrentSchoolIndex(0);
      setOpenSchoolId(paginatedSchools[0]._id ?? null);
    }
  };

  if (loading) return <LogoLoader />;
  if (error) return <p>{error}</p>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSchools = schools.slice(startIndex, endIndex);

  const totalPages = Math.ceil(schools.length / ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen w-full bg-gray-900 mt-20 gap-2 p-5">
        {paginatedSchools?.map((school) => (
          <div
            key={school._id}
            className={`flex flex-col w-full ${openSchoolId && openSchoolId !== school._id ? "hidden" : ""}`}
          >
            <div
              className="flex flex-row justify-between items-center bg-[#1b733f] text-white p-3 cursor-pointer rounded-lg shadow-md"
              onClick={() => { handleToggle(school._id) }}
            >
              <p className="text-lg font-semibold">{school?.nameOfSchool}</p>
              <h5 className="text-xl font-bold">{openSchoolId === school._id ? "-" : "+"}</h5>
            </div>

            <AnimatePresence>
              {openSchoolId === school?._id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-[#b8a188] text-[#60cd84] w-full p-4 rounded-lg shadow-lg mt-2"
                >
                  <div className="bg-white p-4 rounded-lg shadow-md max-h-[500px] overflow-auto">
                    <div className="flex flex-ro justify-center">
                      <h2 className="text-[30px] font-bold mb-2 text-[#1b733f]">{school?.nameOfSchool}</h2>
                    </div>
                    <div className="flex flex-row justify-space-around mb-4 gap-4 justify-center">
                      <p className="text-gray-700 mb-1"><strong>Category:</strong> {school?.category}</p>
                      <p className="text-gray-700 mb-1"><strong>Address:</strong> {school?.address}</p>
                      <p className="text-gray-700 mb-1"><strong>Division:</strong> {school?.division}</p>
                      <p className="text-gray-700 mb-1"><strong>Location:</strong> {school?.location}</p>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-lg font-semibold text-black">List of Staff</h5>
                      {school?.listOfStaff?.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                          {school?.listOfStaff?.map((staff: any) => (
                            <li key={staff?._id} className="text-gray-700">
                              <p><strong>Staff Name:</strong> {staff?.staffName?.firstName}</p>
                              <p><strong>Position:</strong> {staff?.position}</p>
                              <p><strong>Phone:</strong> {staff?.phoneNumber}</p>
                              <p><strong>OG Number:</strong> {staff?.ogNumber}</p>
                              <p><strong>TSC File Number:</strong> {staff?.tscFileNumber}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No staff members found.</p>
                      )}
                    </div>

                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-sm">
                          <h3 className="text-lg font-semibold mb-2 text-black">Principal</h3>
                          {school.principal ? (
                            <div className="text-black">
                              <p><strong>Name:</strong> {school?.principal?.staffName?.firstName}</p>
                              <p><strong>Position:</strong> {school.principal?.position}</p>
                              <p><strong>Gender:</strong> {school.principal?.gender}</p>
                              <p><strong>Phone:</strong> {school.principal?.phoneNumber}</p>
                              <p><strong>OG Number:</strong> {school.principal?.ogNumber}</p>
                              <p><strong>TSC File Number:</strong> {school.principal?.tscFileNumber}</p>
                              <p><strong>Date of Present Posting:</strong> {school?.principal?.dateOfPresentPosting}</p>
                              <p><strong>Date of First Appointment:</strong> {getLongDate(school?.principal?.dateOfFirstAppointment)}</p>
                              <p><strong>Date of Birth:</strong> {getLongDate(school?.principal?.dateOfBirth)}</p>
                              <p><strong>Date of Retirement:</strong> {getLongDate(school?.principal?.dateOfRetirement)}</p>
                              <p><strong>Grade Level:</strong> {school?.principal?.gradeLevel}</p>
                            </div>
                          ) : (
                            <p className="text-gray-500">Vacant</p>
                          )}
                        </div>

                        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-sm">
                          <h3 className="text-lg font-semibold mb-2 text-black">Vice Principal Admin</h3>
                          {school.vicePrincipalAdmin ? (
                            <div className="text-black">
                              <p><strong>Name:</strong> {school?.vicePrincipalAdmin?.staffName.firstName}</p>
                              <p><strong>Position:</strong> {school?.vicePrincipalAdmin?.position}</p>
                              <p><strong>Gender:</strong> {school?.vicePrincipalAdmin?.gender}</p>
                              <p><strong>Phone:</strong> {school?.vicePrincipalAdmin?.phoneNumber}</p>
                              <p><strong>OG Number:</strong> {school?.vicePrincipalAdmin?.ogNumber}</p>
                              <p><strong>TSC File Number:</strong> {school?.vicePrincipalAdmin?.tscFileNumber}</p>
                              <p><strong>Date of Present Posting:</strong> {school?.vicePrincipalAdmin?.dateOfPresentPosting}</p>
                              <p><strong>Date of First Appointment:</strong> {getLongDate(school?.vicePrincipalAdmin?.dateOfFirstAppointment)}</p>
                              <p><strong>Date of Birth:</strong> {getLongDate(school?.vicePrincipalAdmin?.dateOfBirth)}</p>
                              <p><strong>Date of Retirement:</strong> {getLongDate(school?.vicePrincipalAdmin?.dateOfRetirement)}</p>
                              <p><strong>Grade Level:</strong> {school?.vicePrincipalAdmin?.gradeLevel}</p>
                            </div>
                          ) : (
                            <p className="text-gray-500">Vacant</p>
                          )}
                        </div>

                        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-sm">
                          <h3 className="text-lg font-semibold mb-2 text-black">Vice Principal Academics</h3>
                          {school?.vicePrincipalAcademics ? (
                            <div className="text-black">
                              <p><strong>Name:</strong> {school?.vicePrincipalAcademics?.staffName.firstName}</p>
                              <p><strong>Position:</strong> {school.vicePrincipalAcademics?.position}</p>
                              <p><strong>Gender:</strong> {school?.vicePrincipalAcademics?.gender}</p>
                              <p><strong>Phone:</strong> {school?.vicePrincipalAcademics?.phoneNumber}</p>
                              <p><strong>OG Number:</strong> {school?.vicePrincipalAcademics?.ogNumber}</p>
                              <p><strong>TSC File Number:</strong> {school?.vicePrincipalAcademics?.tscFileNumber}</p>
                              <p><strong>Date of Present Posting:</strong> {school?.vicePrincipalAcademics?.dateOfPresentPosting}</p>
                              <p><strong>Date of First Appointment:</strong> {getLongDate(school?.vicePrincipalAcademics?.dateOfFirstAppointment)}</p>
                              <p><strong>Date of Birth:</strong> {getLongDate(school?.vicePrincipalAcademics?.dateOfBirth)}</p>
                              <p><strong>Date of Retirement:</strong> {getLongDate(school?.vicePrincipalAcademics?.dateOfRetirement)}</p>
                              <p><strong>Grade Level:</strong> {school?.vicePrincipalAcademics?.gradeLevel}</p>
                            </div>
                          ) : (
                            <p className="text-gray-500">Vacant</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        
        {showPrevNext && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousSchool}
              className="px-4 py-2 bg-[#1b733f] text-white rounded shadow-md hover:bg-[#1b733f]/80"
            >
              Previous School
            </button>
            <span className="text-white">
              School {startIndex + currentSchoolIndex + 1} of {schools.length}
            </span>
            {currentSchoolIndex < paginatedSchools.length - 1 && (
              <button
                onClick={handleNextSchool}
                className="px-4 py-2 bg-[#1b733f] text-white rounded shadow-md hover:bg-[#1b733f]/80"
              >
                Next School
              </button>
            )}
          </div>
        )}

        {!showPrevNext && (
          <div className="flex justify-center mt-4">
            {currentPage !== 1 && (
              <button
                onClick={() => { handlePageChange(currentPage - 1); }}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#1b733f] text-white rounded-l shadow-md hover:bg-[#1b733f]/80"
              >
                Previous
              </button>
            )}
            <span className="px-4 py-2 bg-[#1b733f] text-white shadow-md">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage !== totalPages && (
              <button
                onClick={() => { handlePageChange(currentPage + 1); }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#1b733f] text-white rounded-r shadow-md hover:bg-[#1b733f]/80"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};