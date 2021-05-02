const router = require('express').Router();
const scheduleController = require('../controllers/Schedule');

// router.post('/', scheduleController.addSchedule);

router.get('/:id', scheduleController.getSchedule);

router.delete('/:id', scheduleController.deleteSchedule);


module.exports = router;