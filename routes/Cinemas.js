const router = require('express').Router();
const cinemasController = require('../controllers/Cinemas');
const { uploadLogo } = require('../helpers/fromUpload');

router.get('/', cinemasController.showCinemas);

router.post('/list/:id', cinemasController.showScheduleCinemas);

router.get('/all', cinemasController.getAllCinemas);

router.get('/all-cinema', cinemasController.getAllCinema)

router.post('/', uploadLogo, cinemasController.addCinemas);

router.get('/:id', cinemasController.getCinemaById)

router.patch('/:id', uploadLogo, cinemasController.updateCinemas);

router.delete('/:id', cinemasController.deleteCinemas)

module.exports = router;
