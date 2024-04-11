import React, { useState, useEffect } from 'react';

const AdminPanel = (props) => {

    const [tickets, setTickets] = useState([]);

    useEffect (() => {
        fetch('/ticketsformsent')
            .then(response => {
                if (!response.ok){
                    throw new Error ('Network did not respond with ticket list');
                }
                return response.json();
            })
            .then (data => {
                setTickets(data);
                console.log(tickets, 'the tickets are:')
            })
            .catch (error => {
                console.error('Error occured fetching tickets: ', error);
            })
    },[])
    
    //make get request to /ticketsformsent url and display all tickets here with response, update status of ticket 
    //status are 'new', 'in progress' and 'resolved'


    return(
      <form className='ticketBody' action='/ticketformsent/adminlogin' method='POST' autoComplete='off'>
     

      </form> 
    )
}

export default AdminPanel;


