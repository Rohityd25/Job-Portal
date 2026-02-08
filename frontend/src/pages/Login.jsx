import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data;

      // 🔐 decode JWT
      const decoded = jwtDecode(token);

      // save
      localStorage.setItem("token", token);
      localStorage.setItem("role", decoded.role); // ROLE_JOB_SEEKER / ROLE_RECRUITER

      // redirect based on role
      if (decoded.role === "ROLE_RECRUITER") {
        navigate("/recruiter/jobs");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
        console.error("LOGIN ERROR 👉", err.response || err);
        alert(err.response?.data || "Login failed");
      }

  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
