import { Route, Routes } from 'react-router-dom';
import { Home, Dashboard, List, Error404, Login, Register } from './pages';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="dashboard/list" element={<List />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error404/>}/>
    </Routes>
  );
}

export default App;
