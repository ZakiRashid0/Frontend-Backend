const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'maindb',
  password: '',
});

const sql = 'SELECT * from tutorials';
const PORT = 3088;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
  })

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('Connected!');
  });

  app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    const dob = req.body.dob;
    const address = req.body.address;
    const postcode = req.body.postcode;
    const state_id = req.body.state_id;
  
    db.query(
      "INSERT INTO employees (name, age, country, position, wage, dob, address, postcode, state_id) VALUES (?,?,?,?,?,?,?,?,?)",
      [name, age, country, position, wage, dob, address, postcode, state_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });
  
  app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  app.put("/update", (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query(
      "UPDATE employees SET wage = ? WHERE id = ?",
      [wage, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
