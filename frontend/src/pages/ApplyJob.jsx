import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const apply = async () => {
    try {
      await API.post(`/api/jobs/${jobId}/apply`);
      alert("Applied successfully");
      navigate("/my-applications");
    } catch {
      alert("Already applied or unauthorized");
    }
  };

  return (
    <div>
      <h2>Apply Job</h2>
      <button onClick={apply}>Apply</button>
    </div>
  );
}

export default ApplyJob;
