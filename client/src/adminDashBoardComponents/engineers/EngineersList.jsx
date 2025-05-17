import React, { useState, useEffect } from "react";
import axios from "axios";

const EngineersList = ({ handleEngineerDetails }) => {
  const [engineers, setEngineers] = useState([]);
  const [filteredEngineers, setFilteredEngineers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Fetch engineers on mount
  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/engineers", { withCredentials: true });
        setEngineers(res.data);
      } catch (err) {
        console.error("Failed to fetch engineers:", err);
      }
    };
    fetchEngineers();
  }, []);

  // Filter engineers whenever inputs change
  useEffect(() => {
    let results = [...engineers];

    if (searchTerm) {
      results = results.filter(
        (engineer) =>
          engineer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          engineer.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterSpecialization) {
      results = results.filter(
        (engineer) => engineer.specialization === filterSpecialization
      );
    }

    if (filterStatus) {
      results = results.filter((engineer) => engineer.status === filterStatus);
    }

    setFilteredEngineers(results);
  }, [engineers, searchTerm, filterSpecialization, filterStatus]);

  const specializations = [...new Set(engineers.map((e) => e.specialization))].filter(Boolean);
  const statuses = [...new Set(engineers.map((e) => e.status))].filter(Boolean);

  return (
    <div className="engineers-list-section bg-white p-8 rounded-lg shadow-xl">
      <div className="filters flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-md border border-gray-300 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={filterSpecialization}
          onChange={(e) => setFilterSpecialization(e.target.value)}
          className="p-3 rounded-md border border-gray-300 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Filter by Specialization</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-3 rounded-md border border-gray-300 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Filter by Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Display engineers in a table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto text-gray-700 border-collapse bg-gray-50">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Phone</th>
              <th className="px-6 py-3 text-left font-semibold">Specialization</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEngineers.length > 0 ? (
              filteredEngineers.map((engineer) => (
                <tr key={engineer.id} className="hover:bg-indigo-50 transition duration-200">
                  <td className="px-6 py-4 border-b">{engineer.name}</td>
                  <td className="px-6 py-4 border-b">{engineer.email}</td>
                  <td className="px-6 py-4 border-b">{engineer.phone}</td>
                  <td className="px-6 py-4 border-b">{engineer.specialization}</td>
                  <td className="px-6 py-4 border-b">{engineer.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center border-b text-gray-500">
                  No engineers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EngineersList;
