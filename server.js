const express = require("express");
const app = express();
require("dotenv").config();
const { Pool } = require("pg");
const port = 8080 || process.env.PORT;
const cors = require("cors");
//app.use(express.static('client/build'));
app.use(express.json());
app.use(cors());

const pool = new Pool({
  database: "todo_db",
  // // connectionString: process.env.DATABASE_URL,
  // // ssl: {
  // //   rejectUnauthorized: false,
  // },
});

app
  .route("/tasks")
  .get((req, res) => {
    pool
      .query(
        "SELECT *, to_char(due_by, 'yyyy-MM-dd') as date FROM tasks ORDER BY due_by ASC"
      )
      .then((result) => {
        res.send(result.rows);
      });
  })
  .post((req, res) => {
    const { task, date } = req.body;
    pool.query(
      "INSERT INTO tasks(task, complete, due_by) VALUES ($1, FALSE, $2) RETURNING *",
      [task, date]
    )
    .then(result => res.send(result.rows[0]))
    
  })
  .delete( (req, res) => {
    const { id } = req.body;
    pool
      .query("DELETE FROM tasks WHERE id=$1 RETURNING task, complete, due_by", [id])
      .then(result => res.send(result.rows[0]))

  })
  .patch((req, res) => {
    const { task, id, complete, due_by } = req.body;
    pool.query(
      `UPDATE tasks SET 
      task = COALESCE($1, task), 
      complete = COALESCE($3, complete), 
      due_by = COALESCE($4, due_by) 
      WHERE id=$2`,
      [task, id, complete, due_by]
    );
    res.send();
  });

app.listen(port, () => {
  console.log("Listening on port:", port);
});
