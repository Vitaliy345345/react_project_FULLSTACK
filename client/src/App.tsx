import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Content from './components/Content';
import ContentAPI from './components/ContentAPI';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { Paths } from './paths';
import './styles/App.css';

function App() {

  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(74deg, rgba(17, 24, 4, 1) 14%, rgba(3, 129, 10, 1) 100%)',
      height: '100vh',
      width: '100vw'
    }}>
      <Auth>
        <Routes>
          <Route path={Paths.home} element={<Layout />}>
            <Route path={Paths.home} element={<Content />} />
            <Route path={Paths.login} element={<Login />} />
            <Route path={Paths.register} element={<Register />} />
          </Route>
        </Routes>
      </Auth>
    </div>
  );
}

export default App;
