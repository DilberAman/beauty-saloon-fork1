const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Load env vars
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both default and fallback ports
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
const bookingsRouter = require('./routes/bookings');
const servicesRouter = require('./routes/services');
const workersRouter = require('./routes/workers');
const availabilityRouter = require('./routes/availability');
const authRouter = require('./routes/auth');

app.use('/api/bookings', bookingsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/workers', workersRouter);
app.use('/api/availability', availabilityRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Beauty Saloon API');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
