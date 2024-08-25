const express = require('express');
const { pool } = require('./Database/db'); // Import the pool from your db.js file

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all to-do items
app.get('/get', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todo');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route to create a new to-do item
app.post('/add', async (req, res) => {
  const { title ,task,completed } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO todo (title,task,completed) VALUES ($1,$2,$3) RETURNING *',
      [title,task,completed]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route to update a to-do item
app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, task, completed } = req.body;
  
    try {
      const result = await pool.query(
        'UPDATE todo SET title = $1, task = $2, completed = $3 WHERE id = $4 RETURNING *',
        [title, task, completed, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// Route to delete a to-do item
app.delete('/del/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todo WHERE id = $1', [id]);
    res.send('To-Do item deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
