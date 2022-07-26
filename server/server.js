const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect DB
connectDB();

// init Middleware
app.use(express.json({extended: false}));

app.get('/', (req,res) => res.send('Api Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/places', require('./routes/api/places'));
app.use('/api/tours', require('./routes/api/tours'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = 5000;

app.listen(PORT, () => console.log('Server started on port 5000'));