import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_SUCCESS } from '../type';
const Authreducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // Assuming the payload contains userType
      const { usertype, token } = action.payload;
      console.log(token);
      localStorage.setItem('token', token);
      let isAuthenticated = '';
      if (usertype === 'Student') {
        isAuthenticated = 'isStudentAuthenticated';
      } else if (usertype === 'Faculty') {
        isAuthenticated = 'isTeacherAuthenticated';
      } else if (usertype === 'admin') {
        isAuthenticated = 'isAdminAuthenticated';
      }
      return {
        ...state,
        [isAuthenticated]: true,
        token,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case 'getuserdata':
      return {
        ...state,
        data: action.payload,
      };
    case 'getuserdata':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return { state };
  }
};
export default Authreducer;
