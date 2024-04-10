const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.createTicket,
  (req, res) => {
    res.status(200).redirect('/');
  }
);

router.get('/backendadminpanel',
  (req, res) => {
    res.status(200).redirect('/');
  }
);


module.exports = router;
