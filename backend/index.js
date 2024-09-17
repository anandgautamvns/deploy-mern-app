const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()


require('dotenv').config()
require('./Models/db')
const AuthRouter = require('./Routes/authRouter')
const ProductRouter = require('./Routes/productRouter')

const port = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
  res.send('Hello')
})

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});