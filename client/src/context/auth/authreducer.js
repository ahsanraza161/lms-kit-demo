import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_SUCCESS } from '../type';
const Authreducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (action.payload) {
      }
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
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
    default:
      return { state };
  }
};
export default Authreducer;
