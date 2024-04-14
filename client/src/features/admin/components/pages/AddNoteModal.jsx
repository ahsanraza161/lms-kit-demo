import React, { useState, useContext } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import AdminContext from '../../../../context/admin/admincontext';

function AddNoteModal({ open, onClose, onCreateNote }) {
  const [content, setContent] = useState('');
  const { notes } = useContext(AdminContext); // Access the createNote action

  const handleClose = () => {
    setContent(''); // Clear content on close
    onClose();
  };

  const handleSubmit = async () => {
    if (!content) return; // Handle empty content

    try {
      const response = await notes(content); // Utilize the createNote action
      if (response.status === 200 || response.status === 201) { // Check for success
        const newNote = response.data;
        onCreateNote(newNote); // Pass the created note back to parent (optional)
        setContent('');
      } else {
        console.error('Error creating note:', response); // Handle errors
      }
    } catch (error) {
      console.error('Error creating note:', error); // Handle network or other errors
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: "white", boxShadow: 24, p: 4 }}>
        <TextField fullWidth label="Note Content" multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!content}>
          Add Note
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default AddNoteModal;
