import React from 'react';

const AdminPanelLogin = (props) => {

    return(
        <form className='ticketBody' action='/ticketformsent/adminlogin' method='POST' autoComplete='off'>
        <label>Password: 
            <input id='passwordInput' style={{marginLeft: '1vw', height:'2vh'}} type='password' name='password' placeholder='Password' required></input>      
            <button className='ticketSubmitButton' style={{marginLeft: '5vw'}}>Submit</button>
        </label>
      </form> 
    )
}

export default AdminPanelLogin;


