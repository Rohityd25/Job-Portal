import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import PostJob from "./pages/recruiter/PostJob";
import JobApplications from "./pages/recruiter/JobApplications";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* JOB SEEKER */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute role="ROLE_JOB_SEEKER">
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply/:jobId"
          element={
            <ProtectedRoute role="ROLE_JOB_SEEKER">
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute role="ROLE_JOB_SEEKER">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* RECRUITER */}
        <Route
          path="/recruiter/jobs"
          element={
            <ProtectedRoute role="ROLE_RECRUITER">
              <RecruiterJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/post-job"
          element={
            <ProtectedRoute role="ROLE_RECRUITER">
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/jobs/:jobId/applications"
          element={
            <ProtectedRoute role="ROLE_RECRUITER">
              <JobApplications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
