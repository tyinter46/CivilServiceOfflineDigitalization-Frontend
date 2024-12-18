import { Routes, Route } from "react-router-dom";

import {
  Home,
  Signup,
  AboutUs,
  Login,
  Profile,
  Dashboard,
  ConfirmAccount,
  School,
  PrincipalsAndVicePrincipals,
  ForgotPassword,
  StaffPosting,
  User,
  UpdateProfilePage
} from "pages";

import {
  HOME,
  SIGNUP,
  ABOUT,
  LOGIN,
  ABOUT_ME,
  DASHBOARD,
  CONFIRM_ACCOUNT,
  SCHOOL,
  PRINCIPALSANDVICEPRINCIPALS,
   FORGOT_PASSWORD,
   USER,
   UPDATE_PROFILE,
   STAFFPOSTING
} from "./CONSTANTS";

import type { FC } from "react";
import { PublicRoute, ProtectedRoute, ProtectedAdminRoute } from "components/gaurds";

const RouterConfig: FC = () => {
  return (
    <div>
      <Routes>
        {/* Public routes should be placed in here */}
        <Route path={HOME} element={<Home />} />

        <Route path={ABOUT} element={<AboutUs />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={SIGNUP} element={<Signup />} />
        <Route path={DASHBOARD} element={<Dashboard />} />

        <Route path="/" element={<PublicRoute />}>
          <Route path={CONFIRM_ACCOUNT} element={<ConfirmAccount />} />
          <Route path={FORGOT_PASSWORD} element={< ForgotPassword/>} />
          
          {/* <Route /> */}
        </Route>




        {/* Auth pages */}
        <Route path="/" element={<ProtectedAdminRoute navigate={LOGIN} />}>
          {/* <Route path = {SCHOOL} element = {<School />} /> */}
          <Route path={SCHOOL} element={<School />} />
 
        
        
        </Route>



        <Route path="/" element={<ProtectedRoute navigate={LOGIN} />}>
          {/* <Route path = {SCHOOL} element = {<School />} /> */}
          <Route path={PRINCIPALSANDVICEPRINCIPALS} element={<PrincipalsAndVicePrincipals />} />
          <Route path={STAFFPOSTING} element={<StaffPosting />} />

          <Route path={ABOUT_ME} element={<Profile />} />
          <Route path = {UPDATE_PROFILE} element = {<UpdateProfilePage />} />
          <Route path= {USER} element= {<User />} />

        </Route>
        {/* Protected routes should be placed in here */}

        {/* 404 page */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>
  );
};

export default RouterConfig;
