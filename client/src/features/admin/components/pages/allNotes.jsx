import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Grid,
  TextField,
} from '@mui/material';
import AdminContext from '../../../../context/admin/admincontext';
import toast, { Toaster } from 'react-hot-toast';
import Note from './note';

function AllNotes() {
  const { addNote, editNote, deleteNote, notes, getNotes } = useContext(AdminContext);
  const [data, setData] = useState({
    title: '',
    content: '',
    _id: '',
  });

  const [current_data, setCurrentData] = useState(null);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (data.title !== '' && data.content !== '') {
      if (current_data !== null) {
        editNote(current_data._id, data); // Change current_data.id to current_data._id
      } else {
        addNote(data);
      }
    } else {
      toast.error('Please fill out all fields');
    }
    setData({
      title: '',
      content: '',
    });
  };
  

  const onChangeHandler = (e) => {
    setData((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="noteDash">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>Notes</h2>
          <form onSubmit={handleAddNote}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              name="title"
              onChange={onChangeHandler}
              value={data.title}
            />
            <TextField
              label="Content"
              fullWidth
              margin="normal"
              name="content"
              onChange={onChangeHandler}
              value={data.content}
            />
            <Button type="submit" variant="contained" color="primary">
              {current_data !== null ? 'Edit Note' : 'Add Note'}
            </Button>
          </form>
        </Grid>
        {notes.length > 0
          ? notes.map((note) => (
              <Note
                title={note.title}
                content={note.content}
                key={note._id}
                id={note._id}
                setCurrentData={setCurrentData} // Pass setCurrentData function down to Note component
                deleteNote={deleteNote} // Pass deleteNote function down to Note component
              />
            ))
          : ''}
      </Grid>
      <Toaster />
    </div>
  );
}

export default AllNotes;
