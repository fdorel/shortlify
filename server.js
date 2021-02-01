const express = require('express');
const config = require('config');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }))
app.use(cors());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 5000;

async function start() {
  try {
    // awaiting for Promise connect() until the process will be done
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    // first parameter is PORT, the second-one is a callback function 
    app.listen((process.env.PORT || 5000), () => console.log(`App has started on port ${PORT}...`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();



