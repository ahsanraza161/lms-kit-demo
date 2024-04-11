import * as React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
// import axios from 'axios'; // Uncomment for backend integration

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
  // const [data, setData] = React.useState(null); // Uncomment for backend integration
  // const [error, setError] = React.useState(null); // Uncomment for backend integration

  // useEffect hook for fetching data (uncomment for backend integration)
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseData = await getDashboardData(); // Replace for your API calls
  //       setData(responseData);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // return statements for loading and error states (uncomment for backend integration)
  // if (error) {
  //   return <div>Error fetching data: {error.message}</div>;
  // }

  // if (!data) {
  //   return <div>Loading data...</div>;
  // }

  return (
    <Grid container spacing={5}>
      <DashboardCard
        title="Students"
        count={dummyData.studentCount}
        path="/dashboard/students"
      />{' '}
      {/* Specify paths */}
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
    </Grid>
  );
}

export default Dashboard;
