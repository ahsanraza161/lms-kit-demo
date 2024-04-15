import React, {  useContext, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AdminContext from '../../../../context/admin/admincontext';
import AllNotes from './allNotes';

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
    <div className="importingNoteToDash">
    <AllNotes/>
    </div>
    <div>
          <Button className='btnForViewNote'
                  variant="contained"
                  color="success"
                >
                  <Link to={"/dashboard/allNotes"} style={{ textDecoration: 'none' }}>
                  View All Notifications
                  </Link>
                </Button>
                </div>
     
        </div>
  );
}

export default Dashboard;