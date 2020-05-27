const express = require('express');
const router = express.Router();

const rootRoute = require('../controllers/experience/root');
const getAllRoute = require('../controllers/experience/get-all');
const writeNewRoute = require('../controllers/experience/write-new');
const updateExistingRoute = require('../controllers/experience/update-existing');

router.get('/', rootRoute);
router.get('/get-all', getAllRoute);
router.post('/write-new', writeNewRoute);
router.put('/update', updateExistingRoute);

module.exports = router;
