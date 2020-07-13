const express = require('express');
const mongoose = require('mongoose');
const note = require('./models/note');
const app = express();

const API_PORT = process.env.PORT || 8080;

app.use(express.json());

const dbPath = ''; // Add MongoDB Path HERE.

mongoose.connect(dbPath, {
  dbName: 'you_note',
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the DB.");
}).catch((err) => console.log("Error connecting to the database."));

app.post("/", (req, res) => {
  const {title, author, body} = req.body;

  let newNote = new note({
    title,
    author,
    body
  });

  newNote
    .save()
    .then((note) => {
      console.log("NOTE SAVED");
      res.json(note);
    }).catch(err => {
      console.log("Error saving the note.")
      res.send("ERROR.");
    });
});

app.listen(API_PORT, () => console.log(`Listening on Port ${API_PORT}`));