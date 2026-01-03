const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
const bookingsRouter = require('./routes/bookings');
const servicesRouter = require('./routes/services');
const workersRouter = require('./routes/workers');
const availabilityRouter = require('./routes/availability');

app.use('/api/bookings', bookingsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/workers', workersRouter);
app.use('/api/availability', availabilityRouter);

app.get('/', (req, res) => {
    res.send('Beauty Saloon API');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
