import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "JOB_SEEKER",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR", err);
      setError("Registration failed. Try simpler password or new email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">JobPortal</h1>
          <p className="text-gray-500 mt-2">Create your account today.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={register} className="space-y-4">

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              className={`py-2 rounded-lg font-medium border ${form.role === "JOB_SEEKER"
                  ? "bg-blue-50 border-blue-600 text-blue-600"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              onClick={() => setForm({ ...form, role: "JOB_SEEKER" })}
            >
              Job Seeker
            </button>
            <button
              type="button"
              className={`py-2 rounded-lg font-medium border ${form.role === "RECRUITER"
                  ? "bg-blue-50 border-blue-600 text-blue-600"
                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              onClick={() => setForm({ ...form, role: "RECRUITER" })}
            >
              Recruiter
            </button>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
