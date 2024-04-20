const express = require('express');
require('dotenv').config();
const router = express.Router();
const Note = require('../models/Notes');

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json(notes);
  } catch (err) {
    console.error('Error retrieving notes:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({
      title,
      content,
    });

    await note.save();

    return res.status(201).json(note);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.content) {
      return res.status(409).json({ message: 'Note with this content already exists.' });
    }
    console.error('Error creating note:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Received note ID:', id); // Move this line below the 'id' declaration

  const { title, content } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json(updatedNote);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json({ message: 'Note successfully deleted' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
