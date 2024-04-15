import React, { useState, useContext } from 'react';
import {
  Button,
  Grid,
  Card,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminContext from '../../../../context/admin/admincontext';

function AllNotes() {
  const [notes, setNotes] = useState([]); // State to store all notes
  const [newNoteTitle, setNewNoteTitle] = useState(''); // State for the new note title
  const [newNoteContent, setNewNoteContent] = useState(''); // State for the new note content
  const [editingNoteId, setEditingNoteId] = useState(null); // State to track the ID of the note being edited
  const [editingNoteTitle, setEditingNoteTitle] = useState(''); // State to store the title of the note being edited
  const [editingNoteContent, setEditingNoteContent] = useState(''); // State to store the content of the note being edited

  const { addNote, editNote } = useContext(AdminContext);

  const handleAddNote = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      return; // Don't create empty notes
    }

    const newNoteObj = {
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID for demo purposes
      title: newNoteTitle,
      content: newNoteContent,
    };

    setNotes([...notes, newNoteObj]); // Add the new note to the state
    setNewNoteTitle(''); // Clear the input field for title
    setNewNoteContent(''); // Clear the input field for content
  };

  const handleEditNote = (id, title, content) => {
    setEditingNoteId(id);
    setEditingNoteTitle(title); // Pre-populate the edit field with the current note title
    setEditingNoteContent(content); // Pre-populate the edit field with the current note content
  };

  const handleSaveEdit = (id) => {
    if (!editingNoteTitle.trim() || !editingNoteContent.trim()) {
      return; // Don't save empty edits
    }

    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title: editingNoteTitle, content: editingNoteContent } : note
    );
    setNotes(updatedNotes); // Update the note in the state with the edited title and content
    setEditingNoteId(null); // Clear editing state
    setEditingNoteTitle(''); // Clear edit field for title
    setEditingNoteContent(''); // Clear edit field for content
  };

  const handleDeleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes); // Remove the deleted note from the state
  };

  return (
    <div className="noteDash">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Notes</h2>
          <form onSubmit={handleAddNote}>
            <TextField
              label="Title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Content"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Add Note
            </Button>
          </form>
        </Grid>
        {notes.map((note) => (
          <Grid item xs={12} key={note.id}>
            <Card className='contentNoteDash'>
              <div>
                {editingNoteId === note.id ? (
                  <>
                    <TextField
                      autoFocus
                      value={editingNoteTitle}
                      onChange={(e) => setEditingNoteTitle(e.target.value)}
                    />
                    <TextField
                      value={editingNoteContent}
                      onChange={(e) => setEditingNoteContent(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h6" component="div">
                      {note.title}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {note.content}
                    </Typography>
                  </>
                )}
              </div>
              <div>
                <IconButton onClick={() => handleEditNote(note.id, note.title, note.content)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteNote(note.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
              {editingNoteId === note.id && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSaveEdit(note.id)}
                >
                  Save
                </Button>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AllNotes;
// i have created a component in my lms project based on mern stack named courses in courses i have a button named add student to the courses, add the students i am getting from backend but i am stucking in how can i add student from all student list i created a button in the last of the every student named add now logic is that i also have a button in main table of courses named show students who are already selected or added from add students button table but i also want that is any students are selected or added then it do not have to show on add student table button