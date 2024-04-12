import React, { useState } from 'react';
import {Button, Grid, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddNoteModal from './AddNoteModal'; // Import the modal component

const dummyData = {
  studentCount: 120,
  courseCount: 35,
  teacherCount: 18,
};

function DashboardCard({ title, count, path }) {
  return (
    <Grid item xs={4}>
      <Link to={path} style={{ textDecoration: 'none' }}>
        <Card sx={{ background: 'linear-gradient(to right bottom, #430089, #2f0027)', padding: '16px', color: '#fff' }}>
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
  const [notes, setNotes] = useState([]); // State to store notes
  const [open, setOpen] = useState(false); // State for modal visibility

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleCreateNote = (newNote) => {
    setNotes([...notes, newNote]); // Add new note to the state
    setOpen(false); // Close modal after creation
  };

  return (
    <Grid container spacing={5}>
      <DashboardCard
        title="Students"
        count={dummyData.studentCount}
        path="/dashboard/students"
      />
      <DashboardCard
        title="Teachers"
        count={dummyData.teacherCount}
        path="/dashboard/teachers"
      />
      <DashboardCard
        title="Courses"
        count={dummyData.courseCount}
        path="/dashboard/courses"
      />

      {/* Add Button to trigger modal */}
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add Note
      </Button>

      {/* Display existing notes */}
      {notes.length > 0 && (
        <div>
          <h2>Notes</h2>
          {notes.map((note) => (
            <Card key={note.id} sx={{ margin: '10px' }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {note.createdAt ? new Date(note.createdAt).toLocaleString() : ''}
                </Typography>
                <Typography variant="body1">{note.content}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* AddNoteModal component */}
      <AddNoteModal open={open} onClose={handleCloseModal} onCreateNote={handleCreateNote} />
    </Grid>
  );
}

export default Dashboard;