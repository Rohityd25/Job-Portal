import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/api/jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id}>
          <h4>{job.title}</h4>
          <p>{job.company} - {job.location}</p>
          <Link to={`/apply/${job.id}`}>Apply</Link>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
