const express = require('express')
const router = express.Router()
const outletController = require('../controllers/outlet.controllers');
// Retrieve all outlet
router.get('/', outletController.findAll);
// Create a new outlet
router.post('/', outletController.create);
// Retrieve a single outlet with id
router.get('/:id', outletController.findOne);
// Update a outlet with id
router.put('/:id', outletController.update);
// Delete a outlet with id
router.delete('/:id', outletController.delete);
module.exports = router