import React, { useState, useEffect } from 'react';

const AdminPanel = (props) => {

    const tickets = useState({});

    useEffect (() => {
        

    },[])
    
    //make get request to /ticketsformsent url and display all tickets here with response, update status of ticket 
    //status are 'new', 'in progress' and 'resolved'

    return(
        <form className='ticketBody' action='/ticketformsent/adminlogin' method='POST' autoComplete='off'>
        <label>Password: 
            <input id='passwordInput' style={{marginLeft: '1vw', height:'2vh'}} type='password' name='password' placeholder='Password' required></input>      
            <button className='ticketSubmitButton' style={{marginLeft: '5vw'}}>Submit</button>
        </label>
      </form> 
    )
}

export default AdminPanel;


