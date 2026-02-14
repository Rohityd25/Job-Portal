import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    API.get("/api/jobs")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  // Filter logic (Client-side for now)
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(job =>
    job.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Search Section */}
      <div className="bg-blue-600 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Find your dream job now</h1>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
            <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-300 px-4 py-2">
              <span className="text-gray-400 mr-2">🔍</span>
              <input
                type="text"
                placeholder="Search by Skills, Company or Job Title"
                className="w-full outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <span className="text-gray-400 mr-2">📍</span>
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-gray-700"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded font-semibold hover:bg-blue-700 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">

        {/* Sidebar Filters (Mock) */}
        <div className="hidden md:block w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-20">
            <h3 className="font-bold text-lg mb-4">All Filters</h3>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Work Mode</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="rounded text-blue-600" /> <span>Work from home</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="rounded text-blue-600" /> <span>Remote</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="rounded text-blue-600" /> <span>Hybrid</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Experience</h4>
              <input type="range" className="w-full accent-blue-600" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0 Yrs</span>
                <span>10+ Yrs</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-2">Salary</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="rounded text-blue-600" /> <span>0-3 Lakhs</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="rounded text-blue-600" /> <span>3-6 Lakhs</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="rounded text-blue-600" /> <span>6-10 Lakhs</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="text-center py-10">Loading jobs...</div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">{filteredJobs.length} Jobs Found</h2>
              <div className="space-y-4">
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500">No jobs match your search.</p>
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                          <p className="text-sm font-medium text-gray-700 mt-1">{job.company}</p>
                        </div>
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-bold">
                          {job.company.charAt(0)}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          💼 0-5 Yrs
                        </span>
                        <span className="flex items-center gap-1">
                          ₹ Not Disclosed
                        </span>
                        <span className="flex items-center gap-1">
                          📍 {job.location}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded mr-2">Java</span>
                        <span className="bg-gray-100 px-2 py-1 rounded mr-2">Spring Boot</span>
                        <span className="bg-gray-100 px-2 py-1 rounded mr-2">Full Stack</span>
                      </div>

                      <div className="mt-6 flex justify-between items-center">
                        <span className="text-xs text-gray-500">Posted just now</span>
                        <Link
                          to={`/apply/${job.id}`}
                          className="text-blue-600 font-semibold hover:bg-blue-50 px-4 py-2 rounded transition"
                        >
                          View & Apply
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
