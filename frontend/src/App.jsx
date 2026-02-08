import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default App;
