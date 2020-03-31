const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressPino = require('express-pino-logger');
const logger = require('./logger');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const expressLogger = expressPino({ logger });

app.use(cors());
app.use(express.json());
app.use(expressLogger);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
	logger.info('MongoDB database connection established successfully');
});

const loginRouter = require('./routes/login');
const streamsRouter = require('./routes/streams');

app.use('/login', loginRouter);
app.use('/streams', streamsRouter);

app.listen(port, () => {
	logger.info(`Server is running on port: ${port}`);
});
