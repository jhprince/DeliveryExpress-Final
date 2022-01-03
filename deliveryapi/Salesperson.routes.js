const express = require('express')
const router = express.Router()
const SalespersonController = require('../controllers/Salesperson.controller.js');
// Retrieve all Salesperson
router.get('/', SalespersonController.findAll);
// Create a new Salesperson
router.post('/', SalespersonController.create);
// Retrieve a single Salesperson with id
router.get('/:id', SalespersonController.findOne);
// Update a Salesperson with id
router.put('/:id', SalespersonController.update);
// Delete a Salesperson with id
router.delete('/:id', SalespersonController.delete);
module.exports = router