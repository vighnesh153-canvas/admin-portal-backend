const express = require('express');
const router = express.Router();

const rootRoute = require('../controllers/collections/root');
const getAllRoute = require('../controllers/collections/get');
const createNewRoute = require('../controllers/collections/create');
const updateExistingRoute = require('../controllers/collections/update');

router.get('/', rootRoute);
router.get('/get', getAllRoute);
router.post('/create', createNewRoute);
router.put('/update', updateExistingRoute);

module.exports = router;
