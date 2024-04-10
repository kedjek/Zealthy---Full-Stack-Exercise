import React from 'react';
import logo from './image2vector.svg';
import './App.css';
import TicketForm from './components/ticket_form';

function App() {
  return (
    <main>
      <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" /> 
              Zealthy Support page
     </header>

     <TicketForm className='ticketBody'/>

    </main>
  );
}

export default App;
