const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');


router.post('/', 
  (req, res) => {
    console.log(req.body)
    res.status(200).redirect('/');
  }
);

router.get('/', 
  (req, res) => {
    console.log(req.body)
    res.status(200).redirect('/');
  }
);

module.exports = router;
