// src/EngineerDashBoardComponents/NewComplaints.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EngineerDashboard.css";

export default function NewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  // fetch all complaints
  useEffect(() => {
    axios
      .get("/api/complaint-history", { params: { status: "all", category: "all", search: "" } })
      .then((res) => {
        setComplaints(res.data);
        // initialize filterDate to first available date or today
        const dates = res.data.map((c) => (c.updated_at || c.created_at || "").split("T")[0]);
        const unique = [...new Set(dates)].filter((d) => d);
        setFilterDate(unique.length > 0 ? unique[0] : "");
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  // get list of unique dates for dropdown
  const dateOptions = [...new Set(
    complaints
      .map((c) => (c.updated_at || c.created_at || "").split("T")[0])
      .filter((d) => d)
  )];

  // filter complaints by selected date
  const filtered = complaints.filter((c) => {
    const datePart = (c.updated_at || c.created_at || "").split("T")[0];
    return datePart === filterDate;
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Complaints by Date</h2>
      <label htmlFor="date-select">Select date: </label>
      <select
        id="date-select"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      >
        {dateOptions.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      {filtered.length === 0 ? (
        <p>No complaints for {filterDate}</p>
      ) : (
        <ul>
          {filtered.map((c) => (
            <li key={c.id}>
              <strong>#{c.id}</strong> {c.title} — {c.updated_at || c.created_at}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
