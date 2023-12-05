// External imps
const router = require('express').Router()

//Internal imps
//ADD MIDDLEWARES!


router.use('/users', require('./api/users'))


// Pending -> flights, airports





module.exports = router