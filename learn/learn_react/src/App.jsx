import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './home/index';
import Blogs from './blogs';
import Contact from './contact';
import Login from './login';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
