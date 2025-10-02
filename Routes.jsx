import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import NotFound from "./pages/NotFound.jsx";
import LearnerDashboard from './pages/learner-dashboard';
import Login from './pages/login';
import OrganizationDashboard from './pages/organization-dashboard';
import HomePage from './pages/home';
import CoursePlayer from './pages/course-player';
import UserRegistration from './pages/user-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/learner-dashboard" element={<LearnerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/course-player" element={<CoursePlayer />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
