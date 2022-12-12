const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config/config.json');
const routes = require('./config/routes');
const errorLog = require('./config/error-log');

require('./db');

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());

routes(app);

app.use(errorLog)

app.listen(config.app.port);

app.listen(process.env.PORT);

console.log('Server running on port ' + config.app.port);

