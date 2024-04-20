import React from 'react';
import {
  Grid,
  Card,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Note = ({ title, content, id, setCurrentData, deleteNote }) => {
  const handleEditClick = () => {
    // Call setCurrentData to populate form fields with note data
    setCurrentData({
      title,
      content,
      _id: id,
    });
  };

  const handleDeleteClick = () => {
    deleteNote(id);
  };

  return (
    <Grid item xs={12}>
      <Card className="contentNoteDash">
        <div>
          <Typography className="noteTitle" variant="h6" component="div">
            {title}
          </Typography>
          <Typography className="noteContent" variant="body2" component="div">
            {content}
          </Typography>
        </div>
        <div>
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
    </Grid>
  );
};

export default Note;
