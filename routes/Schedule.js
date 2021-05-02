const router = require('express').Router();
const scheduleController = require('../controllers/Schedule');

// router.post('/', scheduleController.addSchedule);

router.get('/movies/:id', scheduleController.getSchedule);

router.get('/cinemas/:id', scheduleController.getScheduleByCinemas);

router.delete('/:id', scheduleController.deleteSchedule);


module.exports = router;