const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const express = require("express");
var cors = require("cors");

(async () => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
  await db.exec(
    `CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)`
  );

  const app = express();

  app.use(cors());
  app.use(express.json());

  const port = 3000;

  app.get("/", (req, res) => {
    res.send("I'm working :)");
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/records", async (req, res) => {
    const { title, description } = req.body;
    const result = await db.run(
      `INSERT INTO records (title, description) VALUES (?, ?)`,
      [title, description]
    );
    res.status(201).json({ id: result.lastID });
  });

  app.get("/records", async (req, res) => {
    const records = await db.all(`SELECT * FROM records`);
    res.json(records);
  });

  app.delete("/records/:id", async (req, res) => {
    const { id } = req.params;
    const result = await db.run(`DELETE FROM records WHERE id = ?`, [id]);
    if (result.changes > 0) {
      res.send("Record deleted");
    } else {
      res.status(404).send("Record not found");
    }
  });

  app.delete("/flush-all", async (req, res) => {
    await db.run(`DELETE FROM records`);
    res.send("All records deleted");
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
})();
