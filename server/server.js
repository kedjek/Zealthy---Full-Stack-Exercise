const path = require ('path');
const express = require ('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;
const apiRouter = require('./routes/api');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://linsimon95:rOB1w3L4mrJueXt8@cluster0.hxoymdn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Handle parsing request body
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
  
// Statically serve everything in the dist folder on route '/'
app.use(express.static(path.join(__dirname, '../dist')));

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

  