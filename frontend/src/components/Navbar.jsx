import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setUser({ role });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">JobPortal</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === "ROLE_JOB_SEEKER" ? (
                  <>
                    <Link to="/jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Find Jobs</Link>
                    <Link to="/my-applications" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">My Applications</Link>
                  </>
                ) : (
                  <>
                    <Link to="/recruiter/jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Posted Jobs</Link>
                    <Link to="/recruiter/post-job" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">Post Job</Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-red-600 px-3 py-2 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
