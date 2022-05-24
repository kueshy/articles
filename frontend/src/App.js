import { useEffect, useState } from 'react';
import './App.css';
import ArticlesList from './components/ArticlesList';
import Form from './components/Form';
import Login from './components/layout/Login';
import Register from './components/layout/Register';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './components/layout/Home';
// import useFetch from './components/useFetch';

function App() {

  return (
    <div className="App">
     <Router>
       <div>
       <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Flask Market</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Market</a>
            </li>
          </ul>

          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" style={{ color: 'lawngreen', fontWeight: 'bold' }}>
                <i class="fas fa-coins"></i>
                My articles : 26
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">Welcome, </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Logout</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to='/login' class="nav-link" href="">Login</Link>
            </li>
            <li class="nav-item">
              <Link to='/register' class="nav-link" href="">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
       </div>
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
       </Routes>
     </Router>
    </div>
  );
}

export default App;
