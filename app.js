const express = require('express');
// const morgan = require('morgan');
const mongoose = require('mongoose');

// Load Environment Variables
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

const mongoUsername = process.env.MONGO_DB_USER_NAME;
const mongoPassword = process.env.MONGO_DB_PASSWORD;
const mongoDbName = process.env.MONGO_DB_NAME;

const mongoUrl =
    process.env.MONGO_URL.replace('<db_username>', mongoUsername).replace('<db_password>', mongoPassword) + mongoDbName;

mongoose.connect(mongoUrl, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB');
    }
});

const partnerRouter = require('./src/v1/routes/partnerRoutes');
const productRouter = require('./src/v1/routes/productRoutes');
const userRouter = require('./src/v1/routes/userRoutes');
const submitAnswerRouter = require('./src/v1/routes/submitAnswerRoutes');

// // Use morgan to log requests to the console
// if (process.env.NODE_ENV === 'dev') {
//     app.use(morgan('dev'));
// }

// Set up express.json
app.use(express.json());

// CORS configuration
app.use((req, res, next) => {
    // Allow any origin to access this API, for developing purposes
    // Should be set a specific origin for production
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET, OPTIONS');
        return res.status(200).json({});
    }
    if (
        req.method !== 'OPTIONS' &&
        req.method !== 'GET' &&
        req.method !== 'POST' &&
        req.method !== 'DELETE' &&
        req.method !== 'PATCH'
    ) {
        const error = new Error('Method not allowed');
        error.status = 405;
        next(error);
    }
    next();
});

// Reduce Fingerprinting
app.disable('x-powered-by');

app.use('/v1/partners', partnerRouter);
app.use('/v1/products', productRouter);
app.use('/v1/users', userRouter);
app.use('/v1/submit-answer', submitAnswerRouter);

// Handle requests to invalid resources
app.use((req, res, next) => {
    const error = new Error('Invalid request! No resource was found!');
    error.status = 404; // Not Found
    next(error);
});

// Handle errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

const server = app.listen(port, () => {
    console.log('Server started on port ' + port);
});

module.exports = server;
