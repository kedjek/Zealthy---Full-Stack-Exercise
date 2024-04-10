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
            const response = await fetch(//replace '' with 'fetch url'
            '', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
              console.log('Email sent successfully!');
              
              // Refresh the page after successful submission
              window.location.reload();
            } else {
              console.error('Error sending email:', response.statusText);
            }
    
        } catch (err) {
            console.error('Error sending email:', err)
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
<form onSubmit={handleSubmit} className='mt-10 w-[90%] max-w-[60rem] h-[50vh] text-black'>
        <label>
          Name: <br/>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-1 mb-3 rounded-md border border-black"
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
            className="w-full px-4 py-2 mt-1 mb-3 rounded-md border border-black"
          />
        </label>
        <br />

        <label>
          Message: <br/>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full h-[20vh] max-h-[25vh] px-4 py-2 mt-1 rounded-md border border-black"
          />
        </label>
        <br />
        <div className="flex flex-wrap justify-center items-center w-[90%] max-w-[60rem]">
          <button type="submit" className="px-4 py-2 h-[3.5rem] mt-4 bg-black text-white rounded-md">Submit</button>
          <ReCAPTCHA  className='mt-6 ml-6' sitekey="6LeJBREpAAAAAKheig-GZamg98BkPdm_6vRErNnR" onChange={handleRecaptchaChange} />
        </div>
      </form>
  );
};

export default TicketForm;