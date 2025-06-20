// // src/EngineerDashBoardComponents/UpdateModal.jsx
// import React from "react";
// import "../styles/EngineerDashboard.css";

// const UpdateModal = ({
//   updateModal,
//   updateForm,
//   handleUpdateFormChange,
//   handleUpdateSubmit,
//   setUpdateModal,
// }) => {
//   return (
//     <div className="engineer-update-modal">
//       <div className="engineer-update-modal-content">
//         <div className="engineer-modal-header">
//           <h3>Update Complaint</h3>
//           <button
//             className="engineer-close-modal-btn"
//             onClick={() => setUpdateModal({ visible: false, complaintId: null })}
//           >
//             ✖
//           </button>
//         </div>
//         <form onSubmit={handleUpdateSubmit} className="engineer-update-form">
//           <div className="engineer-form-group">
//             <label htmlFor="status">Status</label>
//             <select
//               id="status"
//               name="status"
//               value={updateForm.status}
//               onChange={handleUpdateFormChange}
//               required
//               className="engineer-select-enhanced"
//             >
//               <option value="">Select status</option>
//               <option value="in-progress">In Progress</option>
//               <option value="completed">completed</option>
//             </select>
//           </div>
//           <div className="engineer-form-group">
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={updateForm.description}
//               onChange={handleUpdateFormChange}
//               required
//               rows="4"
//               placeholder="Enter description"
//               className="engineer-textarea-enhanced"
//             />
//           </div>
//           <div className="engineer-form-actions">
//             <button
//               type="button"
//               className="engineer-cancel-btn"
//               onClick={() => setUpdateModal({ visible: false, complaintId: null })}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="engineer-submit-btn">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateModal;

// src/EngineerDashBoardComponents/UpdateModal.jsx
import React from "react";
import "../styles/EngineerDashboard.css";

const UpdateModal = ({
  updateModal,
  updateForm,
  handleUpdateFormChange,
  handleUpdateSubmit,
  setUpdateModal,
}) => {
  return (
    <div className="engineer-update-modal">
      <div className="engineer-update-modal-content">
        <div className="engineer-modal-header">
          <h3>Update Complaint #{updateModal.complaintId}</h3>
          <button
            className="engineer-close-modal-btn"
            onClick={() => setUpdateModal({ visible: false, complaintId: null })}
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleUpdateSubmit} className="engineer-update-form">

          {/* Status Selection */}
          <div className="engineer-form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={updateForm.status}
              onChange={handleUpdateFormChange}
              required
              className="engineer-select-enhanced"
            >
              <option value="">Select status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Description */}
          <div className="engineer-form-group">
            <label htmlFor="description">Update Description</label>
            <textarea
              id="description"
              name="description"
              value={updateForm.description}
              onChange={handleUpdateFormChange}
              required
              rows="4"
              placeholder="Describe the progress or update"
              className="engineer-textarea-enhanced"
            />
          </div>

          {/* Schedule Visit Date */}
          <div className="engineer-form-group">
            <label htmlFor="scheduled_visit_date">Scheduled Visit Date</label>
            <input
              type="date"
              id="scheduled_visit_date"
              name="scheduled_visit_date"
              value={updateForm.scheduled_visit_date}
              onChange={handleUpdateFormChange}
              className="engineer-input"
            />
          </div>

          {/* Schedule Visit Time */}
          <div className="engineer-form-group">
            <label htmlFor="scheduled_visit_time">Scheduled Visit Time</label>
            <input
              type="time"
              id="scheduled_visit_time"
              name="scheduled_visit_time"
              value={updateForm.scheduled_visit_time}
              onChange={handleUpdateFormChange}
              className="engineer-input"
            />
          </div>

          {/* Visit Type */}
          <div className="engineer-form-group">
            <label htmlFor="visit_type">Visit Type</label>
            <select
              id="visit_type"
              name="visit_type"
              value={updateForm.visit_type}
              onChange={handleUpdateFormChange}
              className="engineer-select-enhanced"
            >
              <option value="">Select type</option>
              <option value="initial">initial</option>
              <option value="follow-up">follow-up</option>
              <option value="final">final</option>
            </select>
          </div>

          {/* Work Done */}
          <div className="engineer-form-group">
            <label htmlFor="work_done">Work Done</label>
            <textarea
              id="work_done"
              name="work_done"
              value={updateForm.work_done}
              onChange={handleUpdateFormChange}
              rows="3"
              placeholder="E.g., fuse replaced, pipe tightened"
              className="engineer-textarea-enhanced"
            />
          </div>

          {/* Parts Replaced */}
          <div className="engineer-form-group">
            <label htmlFor="parts_replaced">Parts Replaced</label>
            <input
              type="text"
              id="parts_replaced"
              name="parts_replaced"
              value={updateForm.parts_replaced}
              onChange={handleUpdateFormChange}
              placeholder="Comma-separated parts (e.g., bulb, pipe)"
              className="engineer-input"
            />
          </div>

          {/* Action Buttons */}
          <div className="engineer-form-actions">
            <button
              type="button"
              className="engineer-cancel-btn"
              onClick={() => setUpdateModal({ visible: false, complaintId: null })}
            >
              Cancel
            </button>
            <button type="submit" className="engineer-submit-btn">
              Submit Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
