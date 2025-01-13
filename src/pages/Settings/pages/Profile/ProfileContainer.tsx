/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/prefer-optional-chain */


/* eslint-disable no-undef */
import ProfileView from "./ProfileView";
import { UserDetails } from "types";
import env from "configs";
import {  UPLOAD_IMAGE } from "../../../../services/CONSTANTS";


import { useAppSelector, useAppDispatch } from "hooks";
import { getLongDate } from "utils";
import { loginSuccess } from "services/auth.service";
import { fetchUser } from "../../../../redux/slices/auth.slice";
// import { getUser } from "../../../../services/users.service";
import { useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";



// import {toast} from "react-toastify"
// import FormData from "form-data"
// import axios from "axios";
// import env from "configs";

export const ProfileContainer = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
console.log(user)
  const [userSaved, setUserSaved] = useState<any>(user);
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
  useEffect(() => {
  
    dispatch(
      fetchUser(userSaved?.user?._doc?._id))
      .unwrap()
      .then((res) => {
        console.log(res);
        // setUserSaved(res)
       
         setUserSaved(res);
        setPosttingLetter(res);
        
        return console.log(postingLetter);
      })
      .catch((err) => {
        toast.error(err)
        console.log(err);
      });
  }, [dispatch]);

  // const latestUser = setUserSaved(dispatch(fetchUser(user?._id)))
  // console.log(latestUser, 'Latest User')
  

  // console.log(postingLetter?.staffName?.firstName);
  const dateOfBirth = getLongDate(userSaved?.user?._doc?.dateOfBirth);
  const dateOfFirstAppointment = getLongDate(userSaved?.user?._doc?.dateOfFirstAppointment);
  const dateOfRetirement = getLongDate(userSaved?.user?._doc?.dateOfRetirement);

  const userDetails: UserDetails = {
    subjectsTaught: userSaved?.user?._doc?.subjectsTaught,
    _id: userSaved?.user?._doc?._id,
    staffName: userSaved?.user?._doc?.staffName?.firstName,
    dateOfBirth,
    dateOfFirstAppointment,
    dateOfRetirement,
    ogNumber: userSaved?.user?._doc?.ogNumber,
    phoneNumber: userSaved?.user?._doc?.phoneNumber,
    letters: postingLetter?.letters?.postingLetter,
    tscFileNumber: userSaved?.user?._doc?.tscFileNumber,
    schoolOfPresentPosting:userSaved?.user?._doc?.schoolOfPresentPosting?.nameOfSchool,
    schoolOfPreviousPosting:userSaved?.user?._doc?.schoolOfPreviousPosting?.nameOfSchool,
    residentialAddress: userSaved?.user?._doc?.residentialAddress,
    zone: userSaved?.user?._doc?.zone,
    division: userSaved?.user?._doc?.division,
    nationality: userSaved?.user?._doc?.nationality,
    stateOfOrigin: userSaved?.user?._doc?.stateOfOrigin,
    lgOfOrigin: userSaved?.user?._doc?.lgOfOrigin,
    ward: userSaved?.user?._doc?.ward,
    staffType:userSaved?.user?._doc?.staffType,
    qualifications: userSaved?.user?._doc?.qualifications,
    dateOfPresentSchoolPosting: userSaved?.user?._doc?.dateOfPresentSchoolPosting,
    cadre: userSaved?.user?._doc?.cadre,
      // dateOfFirstAppointment?: Date;
    // dateOfLastPromotion?: Date;
    // dateOfBirth?: Date;
    gradeLevel: userSaved?.user?._doc?.gradeLevel,
    pfa: userSaved?.user?._doc?.pfa,
    pensionNumber: userSaved?.user?._doc?.pensionNumber,
    // dateOfRetirement?: Date;
    professionalStatus:userSaved?.user?._doc?.professionalStatus,
    email: userSaved?.user?._doc?.email
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