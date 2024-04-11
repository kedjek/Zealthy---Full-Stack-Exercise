import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const TicketForm = (props) => {
      // Use state to manage form data
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        recaptcha: '',
      });
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if recaptcha is filled
        if (!formData.recaptcha || formData.email === '' || formData.name === '') {
          console.error('Please complete the reCAPTCHA and fill out name & email');
          return;
        }
    
        // Add logic to handle form submission (e.g., send data to a server)
        try {
            console.log('Would normally send email here with body: ', formData)
            const vercelUrl = process.env.REACT_APP_VERCEL_URL;
            console.log( "vercel url is written here")
            console.log(process.env.REACT_APP_VERCEL_URL)


            const response = await fetch(`${vercelUrl}/ticketformsent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
              console.log('Email sent successfully!');
              // Refresh the page after successful submission
              // window.location.reload();
              
            } else {
              console.error('Error sending ticket to /ticketformsent:', response.statusText);
            }
            
        } catch (err) {
            console.error('Error caught when sending ticket:', err)
        }
      };
    
      const handleRecaptchaChange = (value) => {
        setFormData({ ...formData, recaptcha: value || ''});
      };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  return (
<form onSubmit={handleSubmit} className='ticketBody'>
        <label>
          Name: <br/>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="ticketFieldBox"
          />
        </label>
        <br />

        <label >
          Email: <br/>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="ticketFieldBox"
          />
        </label>
        <br />

        <label>
          Message: <br/>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="ticketMessageBox"
          />
        </label>
        <br />
        <div className="ticketSubmitSection">
          <button type="submit" className="ticketSubmitButton">Submit</button>
          <ReCAPTCHA  className='' sitekey="6LeJBREpAAAAAKheig-GZamg98BkPdm_6vRErNnR" onChange={handleRecaptchaChange} />
        </div>
      </form>
  );
};

export default TicketForm;