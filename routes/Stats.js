const router = require('express').Router()
const statsController = require('../controllers/Stats')

router.get('/all', statsController.allStats)

module.exports = router;