import { useState } from "react";
import "../styles/EngineerSchedule.css";

const Schedule = ({
  scheduledVisits,
  assignedComplaints,
  getCategoryIcon,
  handleViewDetails,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const mapVisitsByDate = () => {
    const map = {};
    scheduledVisits.forEach((visit) => {
      const visitDate = new Date(visit.date);
      const key = `${visitDate.getFullYear()}-${visitDate.getMonth()}-${visitDate.getDate()}`;
      if (!map[key]) map[key] = [];
      map[key].push(visit);
    });
    return map;
  };

  const visitsByDate = mapVisitsByDate();

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPreviousMonth = getDaysInMonth(year, month - 1);

    const calendarDays = [];

    // Previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPreviousMonth - i,
        isCurrentMonth: false,
        visits: [],
      });
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      const key = `${year}-${month}-${i}`;
      calendarDays.push({
        day: i,
        isCurrentMonth: true,
        isToday:
          i === currentDate.getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
        visits: visitsByDate[key] || [],
      });
    }

    // Next month
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        day: i,
        isCurrentMonth: false,
        visits: [],
      });
    }

    return calendarDays;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="engineerDashboard-schedule-section">
      <h2>My Schedule</h2>
      <div className="engineerDashboard-calendar-container">
        <div className="engineerDashboard-calendar-header">
          <h3>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h3>
          <div className="engineerDashboard-calendar-controls">
            <button
              className="engineerDashboard-calendar-control-btn"
              onClick={handlePreviousMonth}
            >
              <span className="engineerDashboard-btn-icon">◀</span> Previous
            </button>
            <button
              className="engineerDashboard-calendar-control-btn"
              onClick={handleToday}
            >
              Today
            </button>
            <button
              className="engineerDashboard-calendar-control-btn"
              onClick={handleNextMonth}
            >
              Next <span className="engineerDashboard-btn-icon">▶</span>
            </button>
          </div>
        </div>

        <div className="engineerDashboard-calendar-grid">
          <div className="engineerDashboard-calendar-weekdays">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="engineerDashboard-weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="engineerDashboard-calendar-days">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`engineerDashboard-day ${
                  day.isCurrentMonth ? "" : "engineerDashboard-other-month"
                } ${day.isToday ? "engineerDashboard-current-day" : ""}`}
              >
                <div className="engineerDashboard-day-number">{day.day}</div>

                {day.visits && day.visits.length > 0 && (
                  <div
                    className="engineerDashboard-visit-marker"
                    title={`${day.visits.length} visit(s)`}
                  >
                    {day.visits.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="engineerDashboard-scheduled-visits-list">
          <h3>Upcoming Visits</h3>
          {scheduledVisits.length === 0 ? (
            <div className="engineerDashboard-no-results">
              <p>No upcoming visits scheduled</p>
            </div>
          ) : (
            <div className="engineerDashboard-visits-timeline">
              {scheduledVisits.map((visit) => (
                <div
                  className="engineerDashboard-visit-timeline-item"
                  key={visit.id}
                >
                  <div className="engineerDashboard-timeline-date">
                    <div className="engineerDashboard-date-display">
                      <span className="engineerDashboard-date-day">
                        {new Date(visit.date).getDate()}
                      </span>
                      <span className="engineerDashboard-date-month">
                        {new Date(visit.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="engineerDashboard-time-display">
                      {visit.time}
                    </div>
                  </div>
                  <div className="engineerDashboard-timeline-content">
                    <div className="engineerDashboard-timeline-header">
                      <h4>{visit.title}</h4>
                      <span className="engineerDashboard-visit-id">
                        #{visit.id}
                      </span>
                    </div>
                    <p className="engineerDashboard-visit-location">
                      <span className="engineerDashboard-location-icon">
                        📍
                      </span>{" "}
                      {visit.location}
                    </p>
                    <div className="engineerDashboard-timeline-actions">
                      <button
                        className="engineerDashboard-action-btn engineerDashboard-view-btn"
                        onClick={() => {
                          const complaint = assignedComplaints.find(
                            (c) => c.id === visit.id
                          );
                          if (complaint) handleViewDetails(complaint);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
