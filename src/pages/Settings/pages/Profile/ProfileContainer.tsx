/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/prefer-optional-chain */


/* eslint-disable no-undef */
import ProfileView from "./ProfileView";
import { UserDetails } from "types";
import env from "configs";
import {  UPLOAD_IMAGE } from "../../../../services/CONSTANTS";
import { useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "hooks";
import { getLongDate } from "utils";
import { loginSuccess } from "services/auth.service";
import { fetchUser } from "../../../../redux/slices/auth.slice";
//  import { getUser } from "../../../../services/users.service";
import { useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";



// import {toast} from "react-toastify"
// import FormData from "form-data"
// import axios from "axios";
// import env from "configs";

export const ProfileContainer = () => {
  const dispatch = useAppDispatch();
  const location = useLocation ()
  const updatedUser = location?.state?.user?.data?.DATA
  console.log(updatedUser)

  const [postingLetter, setPosttingLetter] = useState<null | string | any>("");
  


  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };

  useEffect(() => {
    loginSuccess()
      .then(() => {
        console.log("user login successful auth service");
      })
      .catch((err) => {
        console.error(err);
      });
     
    
  }, []);
  const { user } = useAppSelector((state) => state.auth);
  console.log(user)
    const [userSaved, setUserSaved] = useState<any>(user);
  useEffect(() => {
    // console.log(getUser('675ff81d3f8a0725f567461e'))
 
    dispatch(
      fetchUser(userSaved.user?._id))
      .unwrap()
      .then((res) => {
        console.log(res);
        console.log(userSaved.user?._id)
        // setUserSaved(res)
       
         setUserSaved(res);
        setPosttingLetter(res);
        window.location.reload()
        return console.log(postingLetter);
      })
      .catch((err) => {
        // toast.error(err)
        console.log(err);
      });
  }, [dispatch]);

  // const latestUser = setUserSaved(dispatch(fetchUser(user?._id)))
  // console.log(latestUser, 'Latest User')
  // console.log(postingLetter?.staffName?.firstName);
  const dateOfBirth = getLongDate(userSaved?.user?.dateOfBirth);
  const dateOfFirstAppointment = getLongDate(userSaved?.user?.dateOfFirstAppointment );
  const dateOfRetirement = getLongDate(userSaved?.user?.dateOfRetirement);

  const userDetails: UserDetails = {
    subjectsTaught: updatedUser?.subjectsTaught ?? userSaved?.user?.subjectsTaught,
    _id: userSaved?.user?._id,
    staffName: updatedUser?.staffName?.firstName ?? userSaved?.user?.staffName?.firstName,
    dateOfBirth,
    dateOfFirstAppointment,
    dateOfRetirement,
    ogNumber: updatedUser?.ogNumber ?? userSaved?.user?.ogNumber,
    phoneNumber: updatedUser?.phoneNumber ?? userSaved?.user?.phoneNumber,
    letters: postingLetter?.letters?.postingLetter ?? userSaved?.user?.letters?.postingLetter,
    tscFileNumber: updatedUser?.tscFileNumber ?? userSaved?.user?.tscFileNumber,
    schoolOfPresentPosting:updatedUser?.schoolOfPresentPosting?.nameOfSchool ?? userSaved?.user?.schoolOfPresentPosting?.nameOfSchool,
    schoolOfPreviousPosting:updatedUser?.schoolOfPreviousPosting?.nameOfSchool ?? userSaved?.user?.schoolOfPreviousPosting.nameOfSchool,
    residentialAddress: updatedUser?.residentialAddress ?? userSaved?.user?.residentialAddress,
    zone: updatedUser?.zone ?? userSaved?.user?.zone ,
    division: updatedUser?.division ?? userSaved?.user?.division,
    nationality: updatedUser?.nationality ?? userSaved?.user?.nationality,
    stateOfOrigin: updatedUser?.stateOfOrigin ?? userSaved?.user?.stateOfOrigin,
    lgOfOrigin: updatedUser?.lgOfOrigin ?? userSaved?.user?.lgOfOrigin,
    ward: updatedUser?.ward ?? userSaved?.user?.ward,
    staffType:updatedUser?.staffType ?? userSaved?.user?.staffType,
    qualifications: updatedUser?.qualifications ?? userSaved?.user?.qualifications,
    dateOfPresentSchoolPosting: updatedUser?.dateOfPresentSchoolPosting ?? userSaved?.user?.dateOfPresentPosting,
    cadre: updatedUser?.cadre ?? userSaved?.user?.cadre,
      // dateOfFirstAppointment?: Date;
    // dateOfLastPromotion?: Date;
    // dateOfBirth?: Date;
    gradeLevel: updatedUser?.gradeLevel ?? userSaved?.user?.gradeLevel,
    pfa: updatedUser?.pfa ?? userSaved?.user?.pfa,
    pensionNumber: updatedUser?.pensionNumber ?? userSaved?.user?.pensionNumber,
    // dateOfRetirement?: Date;
    professionalStatus:updatedUser?.professionalStatus ?? userSaved?.user?.professionalStatus,
    email: updatedUser?.email ?? userSaved?.user?.email
  };

 
  // console.log(userDetails.letters.postingLetter)

  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>)=>{
  // const files = event.target.files
  // if(files){
  //   const formData = new FormData ()
  //   formData.append('file', files[0])

  //   const response = await axios.post("",{

  //   })
  // }
  // }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
      
        const response = await axios.post(`${env.API_BASE_URL}/${UPLOAD_IMAGE}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
      
        
        // await axios.post('/api/upload/upload-image', formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     Authorization: `Bearer ${localStorage.getItem('token')}`, // Include your token if needed
        //   },
        // });

        if (response.data) {
          console.log('Upload successful:', response.data);
          toast.success('Upload successful')
          alert('Picture uploaded successfully!');
          // Optionally update the image URL in your UI or state
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image.');
      } 
    }
  };

  return (
    <>
      <ProfileView
        loading={false}
      
        userDetails={userDetails}
        image={"imageUrl"}
        pictureUpload={handleFileChange}
      ></ProfileView>
    </>
  );
};




// // 
// /* eslint-disable @typescript-eslint/consistent-type-imports */
// import { useEffect, useState } from "react";
// import { useAppSelector, useAppDispatch } from "hooks";
// import { fetchUser } from "../../../../redux/slices/auth.slice";
// import { getLongDate } from "utils";
// import axios from "axios";
// import ProfileView from "./ProfileView";
// import { UserDetails } from "types";


// export const ProfileContainer = () => {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.auth);
//   const [postingLetter, setPostingLetter] = useState<string>("");
//   const [uploading, setUploading] = useState(false);

//   // Fetch user details upon mount
//   useEffect(() => {
//     if (user?._id) {
//       dispatch(fetchUser(user._id))
//         .unwrap()
//         .then((res) => {
//           setPostingLetter(res?.letters?.postingLetter || null);
//           console.log("Fetched User:", res);
//         })
//         .catch((err) => console.error("Error fetching user:", err));
//     }
//   }, [dispatch, user]);

//   // Convert dates to readable format
//   const dateOfBirth = getLongDate(user?.dateOfBirth);
//   const dateOfFirstAppointment = getLongDate(user?.dateOfFirstAppointment);
//   const dateOfRetirement = getLongDate(user?.dateOfRetirement);

//   // Prepare user details for rendering
//   const userDetails: UserDetails = {
//     subjectsTaught: user?.subjectsTaught,
//     _id: user?._id,
//     staffName: user?.staffName?.firstName || "-",
//     dateOfBirth,
//     dateOfFirstAppointment,
//     dateOfRetirement,
//     ogNumber: user?.ogNumber || "-",
//     phoneNumber: user?.phoneNumber || "-",
//     letters: postingLetter,
//     tscFileNumber: user?.tscFileNumber || "-",
//     schoolOfPresentPosting: user?.schoolOfPresentPosting || "-",
//     schoolOfPreviousPosting: user?.schoolOfPreviousPosting || {},
//     residentialAddress: user?.residentialAddress || "-",
//     zone: user?.zone || "-",
//     division: user?.division || "-",
//     nationality: user?.nationality || "-",
//     stateOfOrigin: user?.stateOfOrigin || "-",
//     lgOfOrigin: user?.lgOfOrigin || "-",
//     ward: user?.ward || "-",
//     staffType: user?.staffType || "-",
//     qualifications: user?.qualifications || [],
//     dateOfPresentSchoolPosting: user?.dateOfPresentSchoolPosting || "-",
//     cadre: user?.cadre || "-",
//     gradeLevel: user?.gradeLevel || "-",
//     pfa: user?.pfa || "-",
//     pensionNumber: user?.pensionNumber || "-",
//     professionalStatus: user?.professionalStatus || "-",
//     email: user?.email || "-",
//   };

//   // Image upload handler
//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event?.target?.files && event.target.files[0]) {
//       const selectedFile = event.target.files[0];
//       const formData = new FormData();
//       formData.append("image", selectedFile);

//       try {
//         setUploading(true);
//         const response = await axios.post("/api/upload/upload-image", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (response.data) {
//           console.log("Upload successful:", response.data);
//           alert("Picture uploaded successfully!");
//         }
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         alert("Failed to upload image.");
//       } finally {
//         setUploading(false);
//       }
//     }
//   };

//   return (
//     <ProfileView
//       loading={uploading}
//       userDetails={userDetails}
//       pictureUpload={handleFileChange}
//       image={user?.profileImage || ""}
     
//     />
//   );
// };

// export default ProfileContainer;