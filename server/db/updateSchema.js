// server/db/updateSchema.js
const fs = require('fs');
const path = require('path');
const db = require('./connection');

async function updateSchema() {
  try {
    // Read the SQL file
    const sqlFile = path.join(__dirname, 'engineer_schema_additions.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    // Split the SQL file into individual statements
    const statements = sql
      .split(';')
      .filter(statement => statement.trim() !== '');
    
    console.log(`Found ${statements.length} SQL statements to execute.`);
    
    // Execute each statement
    for (const statement of statements) {
      try {
        await db.query(statement);
        console.log('Successfully executed SQL statement.');
      } catch (err) {
        console.error('Error executing SQL statement:', err);
        console.error('Statement:', statement);
      }
    }
    
    console.log('Schema update complete.');
  } catch (err) {
    console.error('Error updating schema:', err);
  } finally {
    process.exit();
  }
}

updateSchema();
