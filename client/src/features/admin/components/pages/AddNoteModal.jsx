import React, { useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';

function AddNoteModal({ open, onClose, onCreateNote }) {
  const [content, setContent] = useState('');

  const handleClose = () => {
    setContent(''); // Clear content on close
    onClose();
  };

  const handleSubmit = async () => {
    if (!content) return; // Handle empty content

    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    const newNote = await response.json();

    if (response.ok) {
      onCreateNote(newNote); // Pass the created note back to parent
      setContent('');
    } else {
      // Handle API errors
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
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
