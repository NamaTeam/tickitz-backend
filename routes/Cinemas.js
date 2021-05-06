const router = require('express').Router();
const cinemasController = require('../controllers/Cinemas');
const { uploadLogo } = require('../helpers/fromUpload');

router.get('/', cinemasController.showCinemas);

router.post('/list/:id', cinemasController.showScheduleCinemas);

router.get('/all', cinemasController.getAllCinemas);

router.post('/', uploadLogo, cinemasController.addCinemas);

router.patch('/:id', uploadLogo, cinemasController.updateCinemas);

router.delete('/:id', cinemasController.deleteCinemas)

module.exports = router;
