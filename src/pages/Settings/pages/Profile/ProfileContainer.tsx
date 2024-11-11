/* eslint-disable @typescript-eslint/consistent-type-imports */
import ProfileView from "./ProfileView";
import { UserDetails } from "types";

import { useAppSelector, useAppDispatch } from "hooks";
import { getLongDate } from "utils";
import { loginSuccess } from "services/auth.service";
import { fetchUser } from "../../../../redux/slices/auth.slice";
import { useEffect, useState } from "react";



// import {toast} from "react-toastify"
// import FormData from "form-data"
// import axios from "axios";
// import env from "configs";

export const ProfileContainer = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [userSaved, setUserSaved] = useState<any>(user);
  const [postingLetter, setPosttingLetter] = useState<null | string | any>("");

  useEffect(() => {
    loginSuccess()
      .then(() => {
        console.log("user login successful auth service");
      })
      .catch((err) => {
        console.error(err);
      });
    setUserSaved(userSaved);
  }, []);
  useEffect(() => {
    dispatch(fetchUser(userSaved?.user?._doc._id))
      .unwrap()
      .then((res) => {
        console.log(res);
        setPosttingLetter(res);
        return console.log(postingLetter);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);


  

  // console.log(postingLetter?.staffName?.firstName);
  const dateOfBirth = getLongDate(userSaved?.user?._doc?.dateOfBirth);
  const dateOfFirstAppointment = getLongDate(userSaved?.user?._doc?.dateOfFirstAppointment);
  const dateOfRetirement = getLongDate(userSaved?.user?._doc?.dateOfRetirement);

  const userDetails: UserDetails = {
    subjectsTaught: userSaved?.user?._doc?.subjectsTaught,
    _id: userSaved?.user?._doc._id,
    staffName: userSaved?.user?._doc?.staffName?.firstName,
    dateOfBirth,
    dateOfFirstAppointment,
    dateOfRetirement,
    ogNumber: userSaved?.user?._doc?.ogNumber,
    phoneNumber: userSaved?.user?._doc.phoneNumber,
    letters: postingLetter?.letters?.postingLetter,
    tscFileNumber: userSaved?.user?._doc.tscFileNumber,
    schoolOfPresentPosting:userSaved?.user?._doc.schoolOfPresentPosting,
    schoolOfPreviousPosting:userSaved?.user?._doc.schoolOfPreviousPosting,
    residentialAddress: "",
    zone: "",
    division: "",
    nationality: "",
    stateOfOrigin: "",
    lgOgOrigin: "",
    ward: "",
    staffType:"",
    qualifications: [
      {
        schoolName: "oou",
        specialization: "agric",
        startYear: "1997",
        endYear: "2000",
        degreeType: "Bsc"
      },
      {
        schoolName: "oou",
        specialization: "agric",
        startYear: "1997",
        endYear: "2000",
        degreeType: "Bsc"
      }
    ],
    dateOfPresentSchoolPosting: "",
    cadre: "",
    // dateOfFirstAppointment?: Date;
    // dateOfLastPromotion?: Date;
    // dateOfBirth?: Date;
    gradeLevel: "",
    pfa: "",
    pensionNumber: "",
    // dateOfRetirement?: Date;
    professionalStatus: "",
    email: ""
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

  return (
    <>
      <ProfileView
        loading={false}
        create={() => {
          console.log("create");
        
        }}
        userDetails={userDetails}
        image={"imageUrl"}
        pictureUpload={() => {
          return true;
        }}
      ></ProfileView>
    </>
  );
};
