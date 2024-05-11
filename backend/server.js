const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./routes/event_routes');
const { connectSequelizeDB } = require('./models/db_connect');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectSequelizeDB();
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});