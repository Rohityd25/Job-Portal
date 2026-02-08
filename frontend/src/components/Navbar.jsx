import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {token && (
        <>
          <Link to="/jobs">Jobs</Link>{" | "}
          <Link to="/my-applications">My Applications</Link>{" | "}
          <button onClick={logout}>Logout</button>
        </>
      )}

      {!token && (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
