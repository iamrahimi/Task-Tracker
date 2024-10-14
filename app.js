const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// Routes 
const authRoute = require('./routes/auth');
const taskTrackerRoute = require('./routes/task-tracker');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/task-tracker', authenticateUser, taskTrackerRoute);

app.get('/', function (req, res) {
    res.send('Welcome to my page');
}); 




const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.DB_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();