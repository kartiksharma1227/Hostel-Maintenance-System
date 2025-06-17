const express = require('express');
const cors = require('cors');
require('dotenv').config();

// *******************************************************************************************
// STUDENT DASHBOARD ROUTES

const studentProfileRoute = require('./routes/studentDashboardRoutes/studentProfileRoute');
const complainHistoryRoute = require('./routes/studentDashboardRoutes/studentComplaintsHistoryRoute');
const recentComplaintsRouter = require('./routes/studentDashboardRoutes/studentRecentComplaintsRoute'); 
const studentAddComplaintRoute = require('./routes/studentDashboardRoutes/studentAddComplaintRoute');
const studentNotificationRoutes = require('./routes/studentDashboardRoutes/studentNotificationRoute');






// *******************************************************************************************













const updComplaintRoute = require('./routes/updComplaints');
const engineerRoutes = require('./routes/engineer'); // update path if needed




// const complaintsRouter = require('./routes/complaints');


// Import the authentication routes
const authLogin = require('./routes/authLogin');


const adminRouter = require('./routes/Admin');
const feedbackRouter = require('./routes/feedback');
const engineerProfileRoute  = require('./routes/engineerprofile');



// Initialize the Express app
const app = express();

// Middleware
// app.use(cors()); // Allow cross-origin requests


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));



app.use(express.json()); // Parse incoming JSON data

// Use the authentication login route



app.use("/api/compUpd", updComplaintRoute);
app.use('/api/engineer', engineerProfileRoute);
app.use('/api/student', studentProfileRoute);
app.use('/api/feedback', feedbackRouter);





app.use("/api/complaint-history", complainHistoryRoute);
app.use('/api/recent-complaints', recentComplaintsRouter); // Route for recent complaints


//notifications route 
app.use('/api/notifications', studentNotificationRoutes);

 




app.use('/api', authLogin); // Prefix `/api` for login routes


app.use('/api/complaints', studentAddComplaintRoute);

app.use('/api/admin', adminRouter); 
app.use('/api', engineerRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).send('Something broke!'); // Send generic error response
});

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

