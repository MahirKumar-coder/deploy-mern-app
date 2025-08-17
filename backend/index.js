const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./routes/AuthRouter')
const ProductRouter = require('./routes/ProductRouter')

require('dotenv').config(); // Make sure this is present, ideally at the top
require('./models/db');

app.get('/ping', (req, res) => {
  res.send('PONG');
});

app.use(bodyParser.json())
app.use(cors({
  origin: 'https://your-vercel-app.vercel.app', // Replace this with your actual deployed frontend URL
  credentials: true,  // Optional, if you use cookies or authorization headers
}));

app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
