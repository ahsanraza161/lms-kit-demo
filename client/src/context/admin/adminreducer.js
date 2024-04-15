const AdminReducer = (state, action) => {
  switch (action.type) {
    case 'getpendingstudents':
      return {
        ...state,
        pendingStudents: action.payload,
      };
    case 'getapprovedstudents':
      return {
        ...state,
        approvedStudents: action.payload,
      };
    case 'deletestudent':
      return {
        ...state,
        approvedStudents: state.approvedStudents.filter(
          (student) => student._id !== action.payload
        ),
      };
    case 'deletefaculty':
      return {
        ...state,
        faculties: state.faculties.filter(
          (faculty) => faculty._id !== action.payload
        ),
      };
    case 'approvestudent':
      return {
        ...state,
        pendingStudents: state.pendingStudents.filter(
          (student) => student._id !== action.payload
        ),
      };
    case 'getcourses':
      return {
        ...state,
        courses: action.payload,
      };
    case 'deletecourse':
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id !== action.payload
        ),
      };
    case 'addcourse':
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };
    case 'getFaculty':
      return {
        ...state,
        faculties: action.payload,
      };
    case 'getCardData':
      return {
        ...state,
        cardData: action.payload,
      };
    default:
      return state;
  }
};

export default AdminReducer;
