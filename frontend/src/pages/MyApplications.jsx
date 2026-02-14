import { useEffect, useState } from "react";
import API from "../api/axios";

function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/job-seeker/my-applications")
      .then((res) => {
        setApps(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch applications", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-center">Loading applications...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {apps.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-4 font-semibold">Job Title</th>
                <th className="p-4 font-semibold">Company</th>
                <th className="p-4 font-semibold">Applied At</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{a.jobTitle}</td>
                  <td className="p-4">{a.company}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(a.appliedAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Applied
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyApplications;
