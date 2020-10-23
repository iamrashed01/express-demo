const startupDebugger = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require('express');
const app = express();

app.use(express.json());
app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan is enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))