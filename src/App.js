import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import SignIn from './components/Signin';   
import SignUp from './components/Signup';   
import User from './components/User';       

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
