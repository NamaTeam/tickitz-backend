const router = require('express').Router();
const seatController = require('../controllers/Seat')

router.get('/:id', seatController.getSeat);

router.post('/:id', seatController.addSeat);

router.delete('/:id', seatController.deleteSeat);

module.exports = router;