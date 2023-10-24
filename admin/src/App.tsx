import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PAGES
import Login from "./pages/login/Login"
import Admin from "./pages/admin/Admin";
import PrivateRoute from './pages/private/PrivateRoute';


function App() {
    return (
        <> 
            <div>
                <Router>
                    <Routes>
                        <Route path="/admin" element={
                            <PrivateRoute>
                                <Admin/>
                            </PrivateRoute>  }/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </Router>
            </div>
        </>
    )
}


export default App
