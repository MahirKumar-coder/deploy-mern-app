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
  origin: 'https://deploy-mern-app-ux.vercel.app', // Apna actual frontend deployed URL daal
  credentials: true,
}));


app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
