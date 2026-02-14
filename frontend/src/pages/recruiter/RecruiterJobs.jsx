import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

function RecruiterJobs() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await API.get("/api/recruiter/jobs");
            setJobs(res.data);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Posted Jobs</h1>
                <Link
                    to="/recruiter/post-job"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Post New Job
                </Link>
            </div>

            <div className="grid gap-4">
                {jobs.length === 0 ? (
                    <p>No jobs posted yet.</p>
                ) : (
                    jobs.map((job) => (
                        <div key={job.id} className="border p-4 rounded shadow bg-white">
                            <h2 className="text-xl font-semibold">{job.title}</h2>
                            <p className="text-gray-600">
                                {job.company} - {job.location}
                            </p>
                            <div className="mt-4">
                                <Link
                                    to={`/recruiter/jobs/${job.id}/applications`}
                                    className="text-blue-600 hover:underline"
                                >
                                    View Applications
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RecruiterJobs;
