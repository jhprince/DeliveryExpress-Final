const express = require('express')
const router = express.Router()
const SalesRouteController = require('../controllers/SalesRoute.controllers');
// Retrieve all SalesRoute
router.get('/', SalesRouteController.findAll);
// Create a new SalesRoute
router.post('/', SalesRouteController.create);
// Retrieve a single SalesRoute with id
router.get('/:id', SalesRouteController.findOne);
// Update a SalesRoute with id
router.put('/:id', SalesRouteController.update);
// Delete a SalesRoute with id
router.delete('/:id', SalesRouteController.delete);
module.exports = router