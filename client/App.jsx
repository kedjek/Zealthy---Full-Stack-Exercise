import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './image2vector.svg';
import TicketForm from './components/ticket_form';
import AdminPanelLogin from './components/admin_panellogin';
import './App.css';

function App() {
  return (
    <main>
      <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" /> 
              Zealthy Support page
     </header>
      <Routes>
        <Route path = '/' element = {<TicketForm />} />
        <Route path = '/backendadminpanel' element = {<AdminPanelLogin />} />

      </Routes>


    </main>
  );
}

export default App;
