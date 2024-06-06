import React, { useReducer } from 'react';
import AdminContext from './admincontext';
import AdminReducer from './adminreducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const Adminstate = ({ children }) => {
  const initstate = {
    notes: [],
    pendingStudents: [],
    approvedStudents: [],
    deleteFacultys: [],
    faculties: [],
    courses: [],
    attendances: [],
    cardData: {},
    error: null,
  };
  const addMaterial = async (data) => {
    try {
      console.log('context is working');
      const response = await axios.post(
        `https://lms2-two.vercel.app/api/materials/${id}/upload`,
        data
      );
      dispatch({
        type: 'ADD_MATERIAL',
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };
  const getNotes = async () => {
    try {
      const response = await axios.get('https://lms2-two.vercel.app/api/note'); // Adjust the URL based on your backend
      dispatch({
        type: 'getnotes',
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const addNote = async (data) => {
    try {
      setAuthToken(localStorage.token);
      const response = await axios.post('http://localhost:8080/api/note', data);

      dispatch({
        type: 'ADD_NOTE',
        payload: response.data,
      });
      console.log(response.data);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const editNote = async (id, updatedNote) => {
    try {
      setAuthToken(localStorage.token);
      console.log('Note ID:', id);
      const res = await axios.put(
        `http://localhost:8080/api/note/${id}`,
        updatedNote
      );
      dispatch({
        type: 'EDIT_NOTE',
        payload: { id, updatedNote },
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const deleteNote = async (id) => {
    try {
      setAuthToken(localStorage.token);

      const res = await axios.delete(`http://localhost:8080/api/note/${id}`);

      dispatch({ type: 'DELETE_NOTE', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Get pending students
  const getPendingStudents = async () => {
    try {
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const response = await axios.get(
        'https://lms2-two.vercel.app/api/admin/pending',
        config
      );
      dispatch({
        type: 'getpendingstudents',
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Get approved students
  const getApprovedStudents = async () => {
    try {
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const response = await axios.get(
        'https://lms2-two.vercel.app/api/admin/approved',
        config
      );
      dispatch({
        type: 'getapprovedstudents',
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Enroll student in Course
  const addStudentInCourse = async (studentId, courseId) => {
    try {
      const res = await axios.post(
        'https://lms2-two.vercel.app/api/courses/addcourse',
        { studentId, courseId }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // approve student
  const approveHandler = async (id) => {
    try {
      setAuthToken(localStorage.token);
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const res = await axios.patch(
        `http://localhost:8080/api/admin/${id}`,
        config
      );
      dispatch({
        type: 'approvestudent',
        payload: id,
      });
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.delete(`http://localhost:8080/api/admin/${id}`);
      dispatch({
        type: 'deletestudent',
        payload: id,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const deleteFaculty = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/teacher/${id}`
      );
      dispatch({
        type: 'deletefaculty',
        payload: id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Add the getUserData function
  const getUserData = async (id) => {
    try {
      const response = await axios.get(
        `https://lms2-two.vercel.app/api/user/${id}`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error appropriately, e.g., display an error message to the user
      return null; // Or return a custom error object
    }
  };
  // Add the getactivity function
  const getActivity = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/activity'); // Use HTTP for local development

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(
          `Failed to fetch activity data: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error('Error fetching activity data:', error);
      return null; // Or return a custom error object
    }
  };

  // get all faculty
  const getAllFaculty = async () => {
    try {
      setAuthToken(localStorage.token);

      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const res = await axios.get(
        'https://lms2-two.vercel.app/api/admin/getteacher',
        config
      );
      dispatch({
        type: 'getFaculty',
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  // get all courses
  const getAllCourses = async () => {
    try {
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const res = await axios.get(
        'https://lms2-two.vercel.app/api/courses',
        config
      );
      dispatch({
        type: 'getcourses',
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Delete student Course
  const deleteStudentCourse = async (courseId, studentId) => {
    try {
      const res = await axios.delete(
        `https://lms2-two.vercel.app/api/courses/deletestudent/${courseId}/${studentId}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  // Delete Course
  const deleteCourse = async (id) => {
    try {
      const res = await axios.delete(
        `https://lms2-two.vercel.app/api/courses/${id}`
      );
      console.log(res.data);
      dispatch({
        type: 'deletecourse',
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Add Course
  const addCourse = async (data) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.post('http://localhost:8080/api/courses', data);
      dispatch({
        type: 'addcourse',
        payload: res.data,
      });
      console.log(res.data)
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Get Numbers
  const getNumbers = async () => {
    try {
      const res = await axios.get(
        'https://lms2-two.vercel.app/api/admin/getNumbers'
      );
      dispatch({
        type: 'getCardData',
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Mark attenddance
  const markAttendance = async (attendanceList) => {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.post('http://localhost:8080/api/attendance', {
        attendanceList,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAttendanceData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/attendance');
      dispatch({
        type: 'GET_ATTENDANCE_DATA',
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [state, dispatch] = useReducer(AdminReducer, initstate);

  return (
    <AdminContext.Provider
      value={{
        pendingStudents: state.pendingStudents,
        approvedStudents: state.approvedStudents,
        faculties: state.faculties,
        addMaterial,
        getNotes,
        addNote,
        editNote,
        deleteNote,
        getPendingStudents,
        getNumbers,
        approveHandler,
        getUserData,
        getActivity,
        getApprovedStudents,
        deleteStudent,
        getAllCourses,
        deleteStudentCourse,
        deleteCourse,
        addCourse,
        getAllFaculty,
        markAttendance,
        deleteFaculty,
        addStudentInCourse,
        getAttendanceData,
        courses: state.courses,
        faculties: state.faculties,
        cardData: state.cardData,
        notes: state.notes,
        attendances:state.attendances
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default Adminstate;
