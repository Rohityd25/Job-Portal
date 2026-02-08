import { useEffect, useState } from "react";
import API from "../api/axios";

function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get("/api/job-seeker/my-applications")
      .then((res) => setApps(res.data));
  }, []);

  return (
    <div>
      <h2>My Applications</h2>
      {apps.map((a) => (
        <div key={a.applicationId}>
          <h4>{a.jobTitle}</h4>
          <p>{a.company}</p>
          <small>{a.appliedAt}</small>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;
