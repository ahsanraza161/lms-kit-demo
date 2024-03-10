import { LOGIN_SUCCESS } from '../type';
const Authreducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
      };
    default:
      return { state };
  }
};
export default Authreducer;
