import React, { useState, useEffect } from 'react';

const AdminPanel = (props) => {

    const [tickets, setTickets] = useState([]);

    useEffect (() => {
        //make get request to /ticketsformsent url and display all tickets here with response, update status of ticket 
        //status are 'new', 'in progress' and 'resolved'
        fetch('/ticketformsent')
            .then(response => {
                console.log(response, 'response is frontend:')
                if (!response.ok){
                    throw new Error ('Network did not respond with ticket list');
                }
                if (response.status === 204) {
                    throw new Error('No tickets found');
                }
                return response.json()
            })
            .then (data => {
                console.log(data, 'the tickets are:')
            })
            .catch (error => {
                console.error('Error occured fetching tickets: ', error);
            })
    },[])
    


    return(
      <form className='ticketBody' action='/ticketformsent/adminlogin' method='POST' autoComplete='off'>
     

      </form> 
    )
}

export default AdminPanel;


