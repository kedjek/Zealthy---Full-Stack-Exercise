import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TicketForm from './components/ticket_form';
import AdminPanel from './components/admin_panel';
import AdminPanelLogin from './components/admin_panellogin';
import './App.css';
import logo from './image2vector.svg';

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
        <Route path = '/backendadminpanelverified' element = {<AdminPanel />} />
      </Routes>


    </main>
  );
}

export default App;
