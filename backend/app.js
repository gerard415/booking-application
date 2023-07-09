require('dotenv').config()
require('express-async-errors');
const cors = require('cors')

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/auth')

// error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/auth', authRouter)

//errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
