const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const ticketController = require('../controllers/ticketController');
const correctPassword = 'pwd';

router.post('/', ticketController.createTicket,
  (req, res) => {
    res.status(200);
  }
);

router.get('/', ticketController.getTicket,
  (req, res) => {
    //send list of tickets back as response
    console.log('in get router of tickets')
    console.log(res.locals.ticket)
    res.status(200);
  }
);

router.put('/', ticketController.updateTicket,
  (req, res) => {
    res.status(200);
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
