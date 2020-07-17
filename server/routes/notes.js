const express = require('express');
const router = express.Router();

const Note = require('../models/note');

const saveNote = (note, res) => {
  note
    .save()
    .then(note => res.json(note))
    .catch(() => res.status(400).json({msg: "Error: Could not save the note."}));
}

// get request to get notes for a particular user
router.get("/", (req, res) => {
  Note.find({author: req.username.username})
    .then(notes => {
      res.json(notes);
    }).catch(err => res.json({msg: "Could Not find notes for that user."}));
});

// create a note for a user.
router.post("/", (req, res) => {
  const { title, body, videoLink, videoTimestamp } = req.body;
  let note = new Note({
    title,
    body: JSON.parse(body),
    author: req.username.username,
    videoLink,
    videoTimestamp
  });
  saveNote(note, res);
});

// update a note
router.put("/:id", (req, res) => {
  const { title, body, videoLink, videoTimestamp } = req.body;
  Note.findById(req.params.id)
    .then(note => { 
      note.title = title;
      note.body = JSON.parse(body);
      note.videoLink = videoLink,
      note.videoTimestamp = videoTimestamp
      saveNote(note, res);
    }).catch(() => res.json({msg: "No note found with that ID."}));
});

// delete a note
router.delete("/:id", (req, res) => {
  Note
    .findByIdAndDelete(req.params.id)
    .then(() => res.json({msg: "Message Deleted."}))
    .catch(() => res.json({msg: "Could not find note to delete."}));
});

module.exports = router;