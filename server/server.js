const path = require ('path');
const express = require ('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const vercelURL = process.env.VERCELURL;
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');

mongoose.connect(uri, {})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Handle parsing request body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
  
// Statically serve everything in the dist folder on route '/'
app.use(express.static(path.join(__dirname, vercelURL, 'dist')));

// Api routing when receiving form data
app.use('/ticketformsent', apiRouter);

// Serve the React app on /backendadminpanel url
app.get('/backendadminpanel', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Serve the React app on /backendadminpanelverified url when cookie is true ie. logged in
app.get('/backendadminpanelverified', (req, res) => {
  if (req.cookies.adminLoggedIn === 'true'){
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  } else {
    res.redirect('/backendadminpanel')
  }
});


/*catch-all route handler for any requests to an unknown route*/
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


/*starts the server*/
module.exports = app.listen(port, () => {console.log (`Server listening on port: ${port}...`)});

  