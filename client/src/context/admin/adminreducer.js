const AdminReducer = (state, action) => {
  switch (action.type) {
    // Handle note actions (GET_NOTES, ADD_NOTE, EDIT_NOTE, DELETE_NOTE)

    case 'GET_NOTES':
      return action.payload; // Replace notes in state with fetched data
    case 'ADD_NOTE':
      return [...state, action.payload]; // Add new note to existing notes
    case 'EDIT_NOTE':
      const updatedNotes = state.map((note) => (note._id === action.payload.id ? action.payload.updatedNote : note)); // Update specific note based on ID
      return updatedNotes;
    case 'DELETE_NOTE':
      return state.filter((note) => note._id !== action.payload); // Remove note by ID

    // Handle student and faculty actions

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
        faculties: state.faculties.filter((faculty) => faculty._id !== action.payload),
      };
    case 'approvestudent':
      return {
        ...state,
        pendingStudents: state.pendingStudents.filter(
          (student) => student._id !== action.payload
        ),
      };

    // Handle other actions (getcourses, deletecourse, addcourse, getFaculty, getCardData)

    case 'getcourses':
      return {
        ...state,
        courses: action.payload,
      };
    case 'deletecourse':
      return {
        ...state,
        courses: state.courses.filter((course) => course._id !== action.payload),
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

    // Default case (handles unknown actions)
    default:
      return state;
  }
};

export default AdminReducer;
