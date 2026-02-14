import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function PostJob() {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        description: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/api/recruiter/jobs", formData);
            alert("Job posted successfully!");
            navigate("/recruiter/jobs");
        } catch (err) {
            console.error("Failed to post job", err);
            alert("Error posting job");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Job Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Company</label>
                    <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Location</label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded h-32"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                >
                    Post Job
                </button>
            </form>
        </div>
    );
}

export default PostJob;
