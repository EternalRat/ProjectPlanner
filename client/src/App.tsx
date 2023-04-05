import { Route, Routes } from 'react-router-dom';
import { Error404 } from './views/Error/404';
import { Home } from './views/Home/Home';

function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={<Home />}
            />
            <Route
                path='*'
                element={<Error404 />}
            />
        </Routes>
    );
}

export default App;
