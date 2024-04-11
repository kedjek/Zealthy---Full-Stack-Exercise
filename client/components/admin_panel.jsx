import React, { useState, useEffect } from 'react';

const AdminPanel = (props) => {
    const [tickets, setTickets] = useState([]);
    const [updatedTickets, setUpdatedTickets] = useState(new Map());
    const [statusOptions] = useState(['new', 'in progress', 'resolved']);
    

    useEffect (() => {
        //make get request to /ticketsformsent url and display all tickets here with response, update status of ticket 
        fetch('/ticketformsent')
            .then(response => {
                if (!response.ok){
                    throw new Error ('Network did not respond with ticket list');
                }
                if (response.status === 204) {
                    throw new Error('No tickets found');
                }
                return response.json()
            })
            .then (data => {
                setTickets(data)
            })
            .catch (error => {
                console.error('Error occured fetching tickets: ', error);
            })
    },[])

    const handleStatusChange = (index, e) => {
        const updatedTicket = [...tickets];
        updatedTicket[index].status = e.target.value;
        setTickets(updatedTicket);

        //maps changes into updatedTickets
        setUpdatedTickets(prevState => {
            const updatedMap = new Map(prevState);
            const ticketId = updatedTicket[index]._id;
            const existingChanges = updatedMap.get(ticketId) || {};
            updatedMap.set(ticketId, { ...existingChanges, status: e.target.value });
            return updatedMap;
        });
    };
    
    const handleResponseChange = (index, e) => {
        const updatedTicket = [...tickets];
        updatedTicket[index].response = e.target.value;
        setTickets(updatedTicket);

        //maps changes into updatedTickets
        setUpdatedTickets(prevState => {
            const updatedMap = new Map(prevState);
            const ticketId = updatedTicket[index]._id;
            const existingChanges = updatedMap.get(ticketId) || {};
            updatedMap.set(ticketId, { ...existingChanges, response: e.target.value });
            return updatedMap;
        });
    };

    // Prepare data to send to the server
    const handleSubmit = () => {
        const updatedTicketsData = Array.from(updatedTickets).map(([id, changes]) => ({
            id,
            ...changes
        }));
  
        // Send data to the server
        fetch('/ticketformsent', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTicketsData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update tickets');
            }
        })
        .catch(error => {
            console.error('Error occurred while updating tickets: ', error);
        });
    };


    return(
        <div className='adminPanel'>
            <ol>
                {tickets.map((ticket, index)=> (
                    <li key={ticket._id}>
                        <div>
                            <h2>{ticket.name}</h2>
                            <p>Email: {ticket.email}</p>
                            <p>Description: {ticket.message}</p>
                            <label htmlFor={`status-${index}`}>Status:</label>
                            <select
                                id={`status-${index}`}
                                value={ticket.status} 
                                onChange={(event) => handleStatusChange(index, event)} 
                            >
                                {statusOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <form>
                                <label>
                                Response: <br/>
                                <textarea
                                    name="response"
                                    value={ticket.response}
                                    className="ticketMessageBox"
                                    onChange={(event) => handleResponseChange(index, event)}
                                    />
                                </label>
                            </form>

                        </div>
                    </li>
                ))}
            </ol>
          <button type="submit" className="ticketSubmitButton" style={{marginTop: '2em'}} onClick={handleSubmit}>Submit</button>

        </div>
    )
}

export default AdminPanel;


