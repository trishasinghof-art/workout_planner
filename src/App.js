import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ProgramsHome from './components/Programs/ProgramsHome';
import BlogHome from './components/Blog/BlogHome';
import TrainersHome from './components/Trainers/TrainersHome';
import SigninHome from './components/Signin/SigninHome';
import SignupHome from './components/Signup/SignupHome';
import DetailsSection from './components/DetailsSection/DetailsSection';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import RequireAuth from './components/Common/RequireAuth';




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<ProgramsHome />} />
        <Route path="/trainers" element={<TrainersHome/>} />
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/signin" element={<SigninHome />} />
        <Route path="/signup" element={<SignupHome />} />
        <Route path="/details" element={<RequireAuth><DetailsSection /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      </Routes>
    </>
  );
}

export default App;