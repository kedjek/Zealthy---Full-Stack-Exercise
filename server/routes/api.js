const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const ticketController = require('../controllers/ticketController');
const correctPassword = 'pwd';

console.log('does this show in vercel api file?')
console.log('does this show in vercel api file?')



router.post('/', ticketController.createTicket,
(req, res) => {
  console.log('does this show in vercel api file?')
  console.log('does this show in vercel api file?')
  console.log('does this show in vercel api file?')
  res.status(200);
}
);

router.get('/', ticketController.getTicket,
  async (req, res) => {
    try{
      //send list of tickets back as response
      const ticket = res.locals.ticket;
      res.status(200).json(ticket);
    } catch (err) {
      console.error('Error on router to send back tickets: ', err);
      res.status(500).strictContentLength({ error: 'Internal Server router error'})
    }
  }
);

router.put('/', ticketController.updateTicket,
  (req, res) => {
    res.status(200).json({ message: 'Tickets updated successfully' });
  }
);

router.post('/adminlogin',
  (req, res) => {
    const { password } = req.body;

    //if password is correct, then set a cookie & redirect to ticket page
    if (password === correctPassword){
      res.cookie('adminLoggedIn', true, { maxAge: 3600000})

      res.status(200).redirect('/backendadminpanelverified')
    } else {
      res.status(200).redirect('/backendadminpanel')
    }
  }
);


module.exports = router;
