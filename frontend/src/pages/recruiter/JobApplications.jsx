import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";

function JobApplications() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const fetchApplications = async () => {
        try {
            const res = await API.get(`/api/recruiter/jobs/${jobId}/applications`);
            setApplications(res.data);
        } catch (err) {
            console.error("Failed to fetch applications", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Job Applications</h1>

            {applications.length === 0 ? (
                <p>No applications yet.</p>
            ) : (
                <div className="grid gap-4">
                    {applications.map((app) => (
                        <div key={app.id} className="border p-4 rounded shadow bg-white">
                            <p><strong>Job ID:</strong> {app.jobId}</p>
                            <p><strong>Applicant ID:</strong> {app.userId || "N/A"}</p> {/* Backend doesn't send user details yet, only ID probably */}
                            <p><strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default JobApplications;
