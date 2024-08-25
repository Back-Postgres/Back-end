const { Pool } = require("pg");
const config = require("./config"); // Import the database configuration

// Create a new pool instance using the config object
const pool = new Pool(config);

pool.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

module.exports = { pool };
