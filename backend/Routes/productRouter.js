const ensureAuthenicated = require('../Middlewares/auth')


const router = require('express').Router()

router.get('/', ensureAuthenicated, (req, res) => {
  const data = [{name: 'Anand', email: 'anand@test.com'}, {name: 'Gautam', email: 'gautam@test.com'}]
  return res.status(200).json(data)
})

module.exports = router