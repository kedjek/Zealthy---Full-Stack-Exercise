const path = require ('path');
const express = require ('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const apiRouter = require('./routes/api');


const mongoURI = 'mongodb://localhost/ZealthyExercise';
mongoose.connect(mongoURI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
// Statically serve everything in the dist folder on route '/'
app.use(express.static(path.join(__dirname, '../dist')));

// Api routing when receiving formData
app.use('/ticketformsent', apiRouter);

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

  