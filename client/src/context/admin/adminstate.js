import React, { useReducer } from 'react';
import AdminContext from './admincontext';
import AdminReducer from './adminreducer';
import axios from 'axios';

const Adminstate = ({ children }) => {
  const initstate = {
    pendingStudents: [],
  };

  // get pending students
  const getPendingStudents = async () => {
    try {
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const response = await axios.get(
        'http://localhost:8080/api/admin',
        config
      );
      dispatch({
        type: 'setpendingstudents',
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // approve student
  const approveHandler = async (id) => {
    try {
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const res = await axios.put(
        `http://localhost:8080/api/admin/${id}`,
        config
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add the getUserData function
  const getUserData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/${id}`);

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

  const [state, dispatch] = useReducer(AdminReducer, initstate);

  return (
    <AdminContext.Provider
      value={{
        pendingStudents: state.pendingStudents,
        getPendingStudents,
        approveHandler,
        getUserData, // Include getUserData in the context value
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default Adminstate;
