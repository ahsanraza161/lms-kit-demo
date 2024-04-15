const express = require('express');
require('dotenv').config();
const router = express.Router();
const Note = require('../models/Notes');

// @route GET api/note
// @describe Get all notes
// @access public
router.get('/', async (req, res) => {
  try {
    const Notes = await Note.find();
    return res.status(200).json(Notes);
  } catch (err) {
    console.error('msg', err);
    res.status(500).send({ message: err });
  }
});

// @route PUT api/note
// @describe Create Note
// @access private
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await new Note({
      title,
      content,
    });

    await note.save();

    return res.status(200).json({ note });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});

// @route PUT api/note
// @describe update the note
// @access private
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const newNote = {};

    if (title) newNote.title = title;
    if (content) newNote.content = content;
    const note = await Note.findByIdAndUpdate(
      id,
      {
        $set: newNote,
      },
      { new: true }
    );
    return res.status(200).json({ msg: 'Note Updated', note });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});

// @route DELETE api/note
// @describe delete the note
// @access private
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Note.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'Note Successfully Deleted' });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});

module.exports = router;
