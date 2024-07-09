import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Authstate from './context/auth/authstate';
import Adminstate from './context/admin/adminstate';
import AppRouter from './router';

function App() {
  return (
    <Authstate>
      <Adminstate>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Adminstate>
    </Authstate>
  );
}

export default App;
