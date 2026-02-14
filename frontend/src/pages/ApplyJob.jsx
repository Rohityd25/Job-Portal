import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch job details to show what we are applying for
    // Assuming GET /api/jobs returns list, we might need a specific endpoint for one job
    // or filter from list if no endpoint. But usually there is /api/jobs/{id}
    // Let's try to get all jobs and find one, or assume there is an endpoint.
    // Based on JobController, there is only GET /api/jobs (all). 
    // I should probably add GET /api/jobs/{id} to backend or filter here.
    // For now I will filter from all jobs as a quick fix, or just show ID.
    // Actually, JobController.java shows only getAllJobs and createJob. 
    // I should add getJobById to backend for better performance, but I can filter frontend for now.

    API.get("/api/jobs")
      .then(res => {
        const found = res.data.find(j => j.id == jobId);
        setJob(found);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch job", err);
        setLoading(false);
      });
  }, [jobId]);

  const apply = async () => {
    if (!window.confirm("Are you sure you want to apply for this position?")) return;

    try {
      await API.post(`/api/jobs/${jobId}/apply`);
      alert("Application submitted successfully!");
      navigate("/my-applications");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Application failed. You might have already applied.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading job details...</div>;
  if (!job) return <div className="p-6 text-center text-red-500">Job not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold mb-4">Apply for {job.title}</h1>
      <div className="mb-6 space-y-2">
        <p><span className="font-semibold">Company:</span> {job.company}</p>
        <p><span className="font-semibold">Location:</span> {job.location}</p>
        <p><span className="font-semibold">Description:</span> {job.description || "No description provided."}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={apply}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Confirm Application
        </button>
        <button
          onClick={() => navigate("/jobs")}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ApplyJob;
