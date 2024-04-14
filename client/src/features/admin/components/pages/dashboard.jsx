import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import AdminContext from '../../../../context/admin/admincontext';

function DashboardCard({ title, count, path }) {
  return (
      <Grid item xs={4}>
        <Link to={path} style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              background: 'linear-gradient(to right bottom, #430089, #2f0027)',
              padding: '16px',
              color: '#fff',
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {title}
              </Typography>
              <Typography variant="h4" component="div">
                {count}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
  );
}

function Dashboard() {
  const [notes, setNotes] = useState([]); // State to store all notes
  const [newNote, setNewNote] = useState(''); // State for the new note content
  const [editingNoteId, setEditingNoteId] = useState(null); // State to track the ID of the note being edited
  const [editingNoteContent, setEditingNoteContent] = useState(''); // State to store the content of the note being edited

  const handleAddNote = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!newNote.trim()) {
      return; // Don't create empty notes
    }

    const newNoteObj = {
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID for demo purposes
      content: newNote,
    };

    setNotes([...notes, newNoteObj]); // Add the new note to the state
    setNewNote(''); // Clear the input field
  };

  const handleEditNote = (id, content) => {
    setEditingNoteId(id);
    setEditingNoteContent(content); // Pre-populate the edit field with the current note content
  };

  const handleSaveEdit = (id) => {
    if (!editingNoteContent.trim()) {
      return; // Don't save empty edits
    }

    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: editingNoteContent } : note
    );
    setNotes(updatedNotes); // Update the note in the state with the edited content
    setEditingNoteId(null); // Clear editing state
    setEditingNoteContent(''); // Clear edit field
  };

  const handleDeleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes); // Remove the deleted note from the state
  };


  const { getNumbers, cardData } = useContext(AdminContext);

  useEffect(() => {
    getNumbers();
  }, []);

  return (
    <div>
    <Grid container spacing={5}>
      <DashboardCard
        title="Students"
        count={cardData?.students}
        path="/dashboard/students"
      />
      <DashboardCard
        title="Teachers"
        count={cardData?.teachers}
        path="/dashboard/teachers"
      />
      <DashboardCard
        title="Courses"
        count={cardData?.courses}
        path="/dashboard/courses"
      />
    </Grid>
          <div className="noteDash">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Notes</h2>
              <form onSubmit={handleAddNote}>
                <TextField
                  label="New Note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
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
                <Card
                  sx={{
                    display: 'flex',
                    border: '5px solid #000',
                    background: '#f5f5f5',
                  }}
                >
                  <CardContent>
                    <div>
                      {editingNoteId === note.id ? (
                        <TextField
                          autoFocus
                          value={editingNoteContent}
                          onChange={(e) => setEditingNoteContent(e.target.value)}
                          fullWidth
                        />
                      ) : (
                        <Typography variant="body2" component="div">
                          {note.content}
                        </Typography>
                      )}
                    </div>
                    <div>
                      <IconButton
                        onClick={() => handleEditNote(note.id, note.content)}
                      >
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        </div>
  );
}

export default Dashboard;
