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

const input = {
    messages: [
        {
            content: "Hey, let's catch up soon!",
            fromUserId: 12345,
            timestamp: 1632188342000,
            toUserId: 50210,
        },
        {
            content: 'Absolutely! Next week works for me.',
            fromUserId: 50210,
            timestamp: 1632198342000,
            toUserId: 12345,
        },
        {
            content: 'Have you finished the report?',
            fromUserId: 50210,
            timestamp: 1632118342000,
            toUserId: 56789,
        },
        {
            content: 'Almost done, sending it over in an hour.',
            fromUserId: 56789,
            timestamp: 1632128342000,
            toUserId: 50210,
        },
        {
            content: 'Great job on the presentation today!',
            fromUserId: 89012,
            timestamp: 1632208342000,
            toUserId: 50210,
        },
        {
            content: 'Thanks, appreciate it!',
            fromUserId: 50210,
            timestamp: 1632218342000,
            toUserId: 89012,
        },
        {
            content: "Let's plan a meeting for tomorrow.",
            fromUserId: 50210,
            timestamp: 1632228342000,
            toUserId: 34567,
        },
        {
            content: "I'm available after lunch, does 2 PM work?",
            fromUserId: 34567,
            timestamp: 1632238342000,
            toUserId: 50210,
        },
        {
            content: 'Sounds good, see you then!',
            fromUserId: 50210,
            timestamp: 1632248342000,
            toUserId: 34567,
        },
        {
            content: 'Are you free next week for lunch?',
            fromUserId: 50210,
            timestamp: 1632308342000,
            toUserId: 56789,
        },
        {
            content: 'Sure, Tuesday works.',
            fromUserId: 56789,
            timestamp: 1632318342000,
            toUserId: 50210,
        },
        {
            content: "Don't forget to submit the report!",
            fromUserId: 89012,
            timestamp: 1632328342000,
            toUserId: 50210,
        },
        {
            content: "It's done, check your inbox.",
            fromUserId: 50210,
            timestamp: 1632338342000,
            toUserId: 89012,
        },
        {
            content: 'Can we reschedule our meeting?',
            fromUserId: 34567,
            timestamp: 1632348342000,
            toUserId: 50210,
        },
        {
            content: 'How about Friday afternoon?',
            fromUserId: 50210,
            timestamp: 1632358342000,
            toUserId: 34567,
        },
        {
            content: 'Friday works for me!',
            fromUserId: 34567,
            timestamp: 1632368342000,
            toUserId: 50210,
        },
        {
            content: 'Did you receive the file?',
            fromUserId: 12345,
            timestamp: 1632378342000,
            toUserId: 50210,
        },
        {
            content: 'Yes, got it!',
            fromUserId: 50210,
            timestamp: 1632388342000,
            toUserId: 12345,
        },
        {
            content: 'Let me know if you need any help with the project.',
            fromUserId: 56789,
            timestamp: 1632398342000,
            toUserId: 50210,
        },
        {
            content: 'I will, thanks!',
            fromUserId: 50210,
            timestamp: 1632408342000,
            toUserId: 56789,
        },
        {
            content: 'Hey, we need to talk about the budget for next quarter.',
            fromUserId: 89012,
            timestamp: 1632418342000,
            toUserId: 50210,
        },
        {
            content: "Sure, let's set up a meeting.",
            fromUserId: 50210,
            timestamp: 1632428342000,
            toUserId: 89012,
        },
        {
            content: 'Do you have time for a quick call?',
            fromUserId: 34567,
            timestamp: 1632438342000,
            toUserId: 50210,
        },
        {
            content: "I'm free now, let's do it.",
            fromUserId: 50210,
            timestamp: 1632448342000,
            toUserId: 34567,
        },
        {
            content: 'Did you finalize the agenda?',
            fromUserId: 56789,
            timestamp: 1632458342000,
            toUserId: 50210,
        },
        {
            content: 'Almost, I will send it shortly.',
            fromUserId: 50210,
            timestamp: 1632468342000,
            toUserId: 56789,
        },
        {
            content: 'Do you want me to review the draft?',
            fromUserId: 12345,
            timestamp: 1632478342000,
            toUserId: 50210,
        },
        {
            content: 'Yes, that would be helpful!',
            fromUserId: 50210,
            timestamp: 1632488342000,
            toUserId: 12345,
        },
    ],
    userId: 50210,
    users: [
        {
            avatar: 'octocat.jpg',
            firstName: 'John',
            lastName: 'Doe',
            id: 67452,
        },
        {
            avatar: 'genie.png',
            firstName: 'Michael',
            lastName: 'Crowley',
            id: 78596,
        },
        {
            avatar: 'penguin.png',
            firstName: 'Emma',
            lastName: 'Smith',
            id: 12345,
        },
        {
            avatar: 'giraffe.png',
            firstName: 'Olivia',
            lastName: 'Jones',
            id: 56789,
        },
        {
            avatar: 'tiger.png',
            firstName: 'Sophia',
            lastName: 'Brown',
            id: 89012,
        },
        {
            avatar: 'lion.png',
            firstName: 'Ava',
            lastName: 'Wilson',
            id: 34567,
        },
        {
            avatar: 'dog.png',
            firstName: 'James',
            lastName: 'Anderson',
            id: 90123,
        },
        {
            avatar: 'cat.png',
            firstName: 'Lily',
            lastName: 'Davis',
            id: 23456,
        },
        {
            avatar: 'parrot.png',
            firstName: 'Lucas',
            lastName: 'Garcia',
            id: 34578,
        },
        {
            avatar: 'whale.png',
            firstName: 'Mia',
            lastName: 'Martinez',
            id: 45689,
        },
    ],
};

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
app.use('/v1/oa3/get-input', (req, res) => {
    res.json(input);
});

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
