CREATE TABLE IF NOT EXISTS complaint_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  complaint_FK INT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (complaint_FK) REFERENCES Complaints(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS complaint_visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  complaint_FK INT NOT NULL,
  visit_date DATE NOT NULL,
  visit_time TIME NOT NULL,
  visit_type ENUM('initial', 'follow-up', 'final') NOT NULL,
  work_done TEXT,
  parts_replaced TEXT,
  outcome VARCHAR(50),
  FOREIGN KEY (complaint_FK) REFERENCES Complaints(id) ON DELETE CASCADE
);

-- Add scheduled_visit_date and scheduled_visit_time columns to Complaints table if they don't exist
ALTER TABLE Complaints ADD COLUMN IF NOT EXISTS scheduled_visit_date DATE NULL;
ALTER TABLE Complaints ADD COLUMN IF NOT EXISTS scheduled_visit_time TIME NULL;
ALTER TABLE Complaints ADD COLUMN IF NOT EXISTS completed_date TIMESTAMP NULL;
