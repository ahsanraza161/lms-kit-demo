import React, { useReducer } from 'react';
import AdminContext from './admincontext';
import AdminReducer from './adminreducer';
import axios from 'axios';

const Adminstate = ({ children }) => {
  const initstate = {
    pendingStudents: [],
  };
  //  get pending students
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
  const [state, dispatch] = useReducer(AdminReducer, initstate);
  return (
    <AdminContext.Provider
      value={{
        pendingStudents: state.pendingStudents,
        getPendingStudents,
        approveHandler,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default Adminstate;
