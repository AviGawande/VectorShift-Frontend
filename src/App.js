import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import SignIn from './components/Signin';   // Assuming you have a SignIn component
import SignUp from './components/Signup';   // Assuming you have a SignUp component
import User from './components/User';       // Assuming you have a User component

function App() {
  return (
    <BrowserRouter>
    <Router>
      <div>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
    </BrowserRouter>
  );
}

export default App;
