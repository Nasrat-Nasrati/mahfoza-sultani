const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Open the database connection
const db = new sqlite3.Database('my_database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the my_database database.');
  }
});

// Define a route to handle the form submission
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Insert the data into the database
  const sql = `INSERT INTO contact_table (name, email, subject, message) VALUES (?,?,?,?)`;
  db.run(sql, name, email, subject, message, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting data into database');
    } else {
      res.send('Data inserted successfully!');
    }
  });
});
// Get all data from the contact_table
 db.serialize(() => {
   db.all(`SELECT * FROM contact_table`, (err, row) => { 
     if (err) { 
       console.error(err.message);
       }
        console.log(row);});
      
 });
        // Close the database connection
        db.close((err) => { 
           if (err) { 
            console.error(err.message); }
             console.log('Closed the my_database database.');});

// Start the server

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});