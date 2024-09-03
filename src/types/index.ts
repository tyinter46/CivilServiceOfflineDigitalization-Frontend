/* eslint-disable @typescript-eslint/no-empty-interface */

import { store } from "redux/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface UserDetails {
  _id: string;
  letters: string;
  staffName: string;
  phoneNumber: string;
  tscFileNumber: string;
  dateOfBirth: string;
  dateOfFirstAppointment: string;
  dateOfRetirement: string;
  schoolOfPresentPosting: string;
  zone: string;
  division: string;
  nationality: string;
  stateOfOrigin: string;
  lgOgOrigin: string;
  ward: string;
  qualifications: Qualifications[];
  dateOfPresentSchoolPosting: string;
  cadre: string;
  // dateOfFirstAppointment?: Date;
  // dateOfLastPromotion?: Date;
  // dateOfBirth?: Date;
  gradeLevel: string;
  pfa: string;
  pensionNumber: string;
  // dateOfRetirement?: Date;
  professionalStatus: string;
  email: string;
  ogNumber: string;
  // password: string;
  // confirmationCode: string;
  // profilePhoto: string;
  // tetiaryCertificate: string;
  // primarySchoolCertificate?: string;
  // secondarySchoolCert?: string;
  // firstAppointmentLetter?: string;
  // lastPromotionLetter?: string;
  // birthCertificate?: string;
  // serviceStatus?: string;
  // staffType?: string;
  // remark?: string;
}

export interface ISchools {
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

export interface Letters {
  postingLetter?: string;
  promotionLetter?: string;
  confirmationLetter?: string;
  appointmentLetter?: string;
  offerOfAppointmentLetter?: string;
  otherLetter?: string;
}

export interface IUser {
  _id?: string;
  staffName?: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  letters: Letters;
  coordinates?: {
    latitude: string;
    longitude: string;
  };
  position?: string;
  gender?: string;
  phoneNumber?: string;
  confirmPhoneNumber?: string;
  tscFileNumber?: string;
  schoolOfPresentPosting?: ISchools | null;
  zone?: string;
  division?: string;
  nationality?: string;
  stateOfOrigin?: string;
  lgOfOrigin?: string;
  ward?: string;
  qualifications?: Qualifications[];
  subjectsTaught?: string[];
  dateOfPresentSchoolPosting?: Date;
  cadre?: string;
  dateOfFirstAppointment?: Date;
  dateOfFirstAppointmentAtTescom?: Date;
  dateOnGradeLevelEight?: Date;
  dateOfLastPromotion?: Date;
  dateOfBirth?: Date;
  gradeLevel?: number;
  pfa?: string;
  pensionNumber?: string;
  dateOfRetirement?: Date;
  professionalStatus?: string;
  email?: string;
  ogNumber?: string;

  confirmationCode?: string;
  profilePhoto?: string;
  tetiaryCertificate?: string;
  primarySchoolCertificate?: string;
  secondarySchoolCert?: string;
  firstAppointmentLetter?: string;
  lastPromotionLetter?: string;
  birthCertificate?: string;
  isAdmin?: boolean;
  authLevel?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
  isDeleted?: boolean;
  accountStatus?: string;
  accountSource?: string;
  serviceStatus?: string;
  staffType?: string;
  remark?: string;
  lastVisited?: Date;

  // staffDetailsFromCaps? :
}

export interface Settings {
  tscFileNumber: string;
  schoolOfPresentPosting: string;
  zone: string;
  division: string;
  nationality: string;
  stateOfOrigin: string;
  lgOgOrigin: string;
  ward: string;
  qualifications: Qualifications[];
  dateOfPresentSchoolPosting: string;
  cadre: string;
  // dateOfFirstAppointment?: Date;
  // dateOfLastPromotion?: Date;
  // dateOfBirth?: Date;
  gradeLevel: string;
  pfa: string;
  pensionNumber: string;
  // dateOfRetirement?: Date;
  professionalStatus: string;
  email: string;
  // profilePhoto: string;
  // tetiaryCertificate: string;
  primarySchoolCertificate?: string;
  secondarySchoolCert?: string;
  firstAppointmentLetter?: string;
  lastPromotionLetter?: string;
  birthCertificate?: string;
  staffType?: string;
  // remark?: string;
}

// export interface UserDetails {
//     country: string;
//     email: string;
//     name: Name;
//     phoneNumber: string;
//     _id: string;
//     address: string;
//     zip: string;
//     dateOfBirth: string;
//     city: string;
//     state: string;
//     profilePhoto: string;
//   }

export interface Qualifications {
  degreeType: string;
  specialization: string;
  startYear: string;
  endYear: string;
  schoolName: string;
}

export interface imageResponse {
  STATUS: String;
  MESSAGE: String;
  DATA: any;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExistingStaffDetails {}
