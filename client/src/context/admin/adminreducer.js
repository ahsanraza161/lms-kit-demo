const AdminReducer = (state, action) => {
  switch (action.type) {
    case 'setpendingstudents':
      return {
        ...state,
        pendingStudents: action.payload,
      };
  }
};

export default AdminReducer;
