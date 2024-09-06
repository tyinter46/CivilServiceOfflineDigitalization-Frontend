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
  PrincipalsAndVicePrincipals
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
  PRINCIPALSANDVICEPRINCIPALS
} from "./CONSTANTS";

import type { FC } from "react";
import { PublicRoute, ProtectedRoute } from "components/gaurds";

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
       
        
          {/* <Route /> */}
        </Route>

        {/* Auth pages */}
        <Route path="/" element={<ProtectedRoute navigate={LOGIN} />}>
          {/* <Route path = {SCHOOL} element = {<School />} /> */}
          <Route path={SCHOOL} element={<School />} />
          <Route path={ABOUT_ME} element={<Profile />} />
          <Route path={PRINCIPALSANDVICEPRINCIPALS} element={<PrincipalsAndVicePrincipals />} />
        </Route>
        {/* Protected routes should be placed in here */}

        {/* 404 page */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>
  );
};

export default RouterConfig;
