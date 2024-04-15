import React from 'react';
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

const Note = ({ title, content, id }) => {
  return (
    <>
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
            <IconButton
              onClick={() => {
                setData({
                  title,
                  content,
                  id,
                });
                setCurrentData({
                  title,
                  content,
                  id,
                });
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteNote(id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Card>
      </Grid>
    </>
  );
};

export default Note;
