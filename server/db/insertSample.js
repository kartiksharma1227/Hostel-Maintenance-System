// Server/db/connection.js

const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config(); // Ensure environment variables are loaded

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // e.g., gateway01.us-west-2.prod.aws.tidbcloud.com
  user: process.env.DB_USER, // e.g., 3Y1LLS5Lwwu92Dn.root
  password: process.env.DB_PASS, // Your password
  database: process.env.DB_NAME, // e.g., test
  port: 4000, // Default TiDB Cloud Serverless port
  ssl: {
    // For TiDB Cloud Serverless, Node.js uses the built-in Mozilla CA certificate
    // which is trusted by TiDB Cloud Serverless, so no need to specify a CA file.
    rejectUnauthorized: true // Ensures the server's certificate is verified
  }
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// Create a sample table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
  )
`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating table:', err.stack);
    return;
  }
  console.log('Table created or already exists');
});

// Insert sample data
const insertDataQuery = `
  INSERT INTO users (name, email)
  VALUES
    ('John Doe', 'john@example.com'),
    ('Jane Smith', 'jane@example.com'),
    ('Alice Johnson', 'alice@example.com')
`;

connection.query(insertDataQuery, (err, results) => {
  if (err) {
    console.error('Error inserting data:', err.stack);
    return;
  }
  console.log('Sample data inserted');
});

// Query the data to verify insertion
const selectQuery = 'SELECT * FROM users';

connection.query(selectQuery, (err, results) => {
  if (err) {
    console.error('Error querying data:', err.stack);
    return;
  }
  console.log('Fetched users:', results);
  connection.end(); // Close the connection after the query
});
