const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');

const app = express();

app.use(cors());
app.use('/api', apiRoutes); 

app.listen(process.env.PORT || 8081, () => console.log('API Server is running'));