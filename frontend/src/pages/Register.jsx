import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "JOB_SEEKER",
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/api/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch {
      alert("Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="JOB_SEEKER">Job Seeker</option>
        <option value="RECRUITER">Recruiter</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
