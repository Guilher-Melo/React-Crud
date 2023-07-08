import Logo from '../components/template/Logo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import './App.css';
import Nav from '../components/template/Nav';
import Footer from '../components/template/Footer';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Routes';

function App() {
  return (
    <div className="app">
     <BrowserRouter>
       <Logo />
       <Nav />
       <Rotas />
       <Footer />
     </BrowserRouter>
    </div>
  );
}

export default App;
