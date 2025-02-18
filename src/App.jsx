import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';

const routes = (
    <Router>
        <Routes>
            <Route path="/Home" exact element={<Home/>}/>
            <Route path="/Login" exact element={<Login/>}/>
            <Route path="/SignUp" exact element={<SignUp/>}/>
            <Route path="/" exact element={<Login/>}/>
        </Routes>
    </Router>
);

const App = () => {
    return <div>{routes}</div>
}

export default App