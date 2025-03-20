// /* eslint-disable no-undef */
// import { Navbar, TesSearch, Input } from "components";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { fetchExistingUsers} from "../../services/users.service";
// // import { getLongDate } from "utils";
// import LogoLoader from "components/widgets/loader/LogoLoader";
// import {  IExistingStaff} from "types";
// // import { downloadLogo } from "assets/logos";
// // import { user } from "assets/images";

// const ITEMS_PER_PAGE = 9;

// export const ExistingStaffView: React.FC = () => {
//   const [existingUsers, setExistingUsers] = useState<IExistingStaff[]>([]);
//   const [openUserId, setOpenUserId] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [showPrevNext, setShowPrevNext] = useState<boolean>(false);
//   const [currentUserIndex, setCurrentUserIndex] = useState<number>(0);
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   useEffect(() => {
//     const loadExixtingUsers = async () => {
//       try {
//         // const fetchedExistingUsers  = await fetchExistingUsers();
//       console.log(fetchExistingUsers)
//         // setExistingUsers(fetchedExistingUsers);
//       } catch (error) {
//         setError("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     void loadExixtingUsers();
//   }, []);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     setOpenUserId(null);
//     setShowPrevNext(false);
//     setCurrentUserIndex(0);
//   };

//   const handlePreviousUser = () => {
//     if (currentUserIndex > 0) {
//       const newIndex = currentUserIndex - 1;
//       setCurrentUserIndex(newIndex);
//       setOpenUserId(filteredUsers[newIndex]._id ?? null);
//       const newPage = Math.floor(newIndex / ITEMS_PER_PAGE) + 1;
//       setCurrentPage(newPage);
//     }
//   };

//   const handleNextUser = () => {
//     if (currentUserIndex < filteredUsers.length - 1) {
//       const newIndex = currentUserIndex + 1;
//       setCurrentUserIndex(newIndex);
//       setOpenUserId(filteredUsers[newIndex]._id ?? null);
//       const newPage = Math.floor(newIndex / ITEMS_PER_PAGE) + 1;
//       setCurrentPage(newPage);
//     }
//   };

//   const handleToggle = (_id: string | undefined) => {
//     if (_id) {
//       setOpenUserId(openUserId === _id ? null : _id);
//       setShowPrevNext(openUserId !== _id);
//       if (openUserId !== _id) {
//         const index = filteredUsers.findIndex((user) => user._id === _id);
//         setCurrentUserIndex(index);
//         const newPage = Math.floor(index / ITEMS_PER_PAGE) + 1;
//         setCurrentPage(newPage);
//       }
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const filteredUsers = existingUsers.filter(
//     (existingUser)=>        existingUser?.nameOfOfficer?.toLowerCase().includes(searchTerm.toLowerCase()) ??
//                     existingUser?.gradeLevel?.toLowerCase().includes(searchTerm.toLowerCase()) 
//                     // existingUsers?.dateOfBirth.toLowerCase().includes(searchTerm.toLowerCase()) ??
//                     // existingUsers?..toLowerCase().includes(searchTerm.toLowerCase())
//     // (school) =>
//     //   school.nameOfSchool.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //   school.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     //   school.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <LogoLoader />;
//   if (error) return <p>{error}</p>;

//   const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col h-full w-full bg-gray-900 mt-16 gap-2 p-5">
//       <h4 className="text-white"> Total Number of Users : {existingUsers.length}</h4>
//         <div className="flex flex-row w-full justify-end items-center color-white gap-1 items-right mb-4">
      
//           <Input
//             size="md"
//             onChange={handleChange}
//             value={searchTerm}
//             placeholder="Search schools..."
//             className="rounded-[50px] h-10 w-80 text-lg"
//           />
//           <TesSearch size={30} />
//         </div>

//         {paginatedUsers.length > 0 ? (
//           paginatedUsers.map((existingUser) => (
//             <div
//               key={existingUser._id}
//               className={`flex flex-col w-full ${
//                 openUserId && openUserId !== existingUser._id ? "hidden" : ""
//               }`}
//             >
//               <div
//                 className="flex flex-row justify-between items-center hover:bg-[#7ed348] hover:text-black bg-[#1b733f] text-white p-3 cursor-pointer rounded-lg shadow-md"
//                 onClick={() => {
//                   handleToggle(existingUser._id);
//                 }}
//               >
//                 <p className="text-lg font-semibold">
//               {existingUser?.nameOfOfficer.toUpperCase()} 
//                 </p>
//                 <h5 className="text-xl font-bold">{openUserId === existingUser._id ? "-" : "+"}</h5>
//               </div>

//               <AnimatePresence>
//                 {openUserId === existingUser?._id && (
//                   <motion.div
//                     initial={{ height: 0 }}
//                     animate={{ height: "auto" }}
//                     exit={{ height: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="overflow-hidden bg-[#b8a188] text-[#60cd84] w-full p-4 rounded-lg shadow-lg mt-2"
//                   >
//                     <div className="bg-white p-4 rounded-lg shadow-md max-h-[500px] overflow-auto">
//                       <div className="flex flex-row justify-center">
//                         <h2 className="text-[30px] font-bold mb-2 text-[#1b733f]">
//                           {existingUser?.nameOfOfficer} 
//                         </h2>
//                       </div>
//                       <div className="flex flex-row justify-space-around mb-4 gap-4 justify-center">
//                         <p className="text-gray-700 mb-1">
//                           {/* <strong>Category:</strong> {school?.category} */}
//                         </p>
//                         <p className="text-gray-700 mb-1">
//                           {/* <strong>Address:</strong> {school?.address} */}
//                         </p>
//                         <p className="text-gray-700 mb-1">
//                           {/* <strong>Division:</strong> {school?.division} */}
//                         </p>
//                         <p className="text-gray-700 mb-1">
//                           {/* <strong>Location:</strong> {school?.location} */}
//                         </p>
//                       </div>

//                       <div className="flex flex-col space-y-4">
//                         <div className="flex flex-wrap gap-4">
//                           <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-sm">
//                             <h3 className="text-lg font-semibold mb-2 text-black">Existing Staff</h3>
//                             <p>{existingUser?.nameOfOfficer}</p>
//                             <p>{existingUser?.ogNum}</p>
//                             <p>{existingUser?.gradeLevel}</p>
                            



//                           </div>

                          

                         
                       
                          
//                         </div>
//                       </div>
//                     </div>

                  
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))
//         ) : (
//           <p className="text-white text-center">No user found matching your search.</p>
//         )}

//         {showPrevNext && (
//           <div className="flex justify-between items-center mt-4">
//             <button
//               onClick={handlePreviousUser}
//               className="px-4 py-2 bg-[#1b733f] text-white rounded shadow-md hover:bg-[#1b733f]/80"
//             >
//               Previous User
//             </button>
//             <span className="text-white">
//               User {currentUserIndex + 1} of {filteredUsers.length}
//             </span>
//             {currentUserIndex < filteredUsers.length - 1 && (
//               <button
//                 onClick={handleNextUser}
//                 className="px-4 py-2 bg-[#1b733f] text-white rounded shadow-md hover:bg-[#1b733f]/80 hover:bg-[#7ed348] hover:text-black"
//               >
//                 Next User
//               </button>
//             )}
//           </div>
//         )}

//         {!showPrevNext && (
//           <div className="flex justify-center mt-4">
//             {currentPage !== 1 && (
//               <button
//                 onClick={() => {
//                   handlePageChange(currentPage - 1);
//                 }}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-[#1b733f] text-white rounded-l shadow-md hover:bg-[#1b733f]/80 hover:bg-[#7ed348] hover:text-black"
//               >
//                 Previous
//               </button>
//             )}
//             <span className="px-4 py-2 bg-[#1b733f] text-white shadow-md">
//               Page {currentPage} of {totalPages}
//             </span>
//             {currentPage !== totalPages && (
//               <button
//                 onClick={() => {
//                   handlePageChange(currentPage + 1);
//                 }}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-[#1b733f] text-white rounded-r shadow-md hover:bg-[#1b733f]/80 hover:bg-[#7ed348] hover:text-black"
//               >
//                 Next
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
