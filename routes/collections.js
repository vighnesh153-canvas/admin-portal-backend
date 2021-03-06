const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-auth');

const rootRoute = require('../controllers/collections/root');
const getAllRoute = require('../controllers/collections/get');
const createNewRoute = require('../controllers/collections/create');
const updateExistingRoute = require('../controllers/collections/update');
const removeExistingRoute = require('../controllers/collections/remove');

router.get('/', rootRoute);
router.get('/get', getAllRoute);
router.post('/create', isAuth, createNewRoute);
router.put('/update', isAuth, updateExistingRoute);
router.post('/remove', isAuth, removeExistingRoute);

module.exports = router;
