const mongoose = require('mongoose')

const mongo_url = process.env.MONGO_CONNECTION

mongoose.connect(mongo_url)
  .then(() => {
    console.log('database connected')
  })
  .catch((error) => {
    console.log(`database error ${error}`)
  })