const product = require('../models/product.model.js');
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    product.find()
        .then(product => {
            res.send(product);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of Outlet."
            });
        });
};
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    // Create a new User
    const pt = new product({
        Name: req.body.Name,
        Unitprice: req.body.Unitprice,
        ThresholdQty: req.body.ThresholdQty,
        Description: req.body.Description,
        Stock: req.body.Stock,
    });
    // Save user in the database
    pt.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new user."
            });
        });
};
// Find a single User with a id
exports.findOne = (req, res) => {
    product.findById(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.id
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error getting user with id " + req.params.id
            });
        });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }
    // Find user and update it with the request body
    product.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        Unitprice: req.body.Unitprice,
        ThresholdQty: req.body.ThresholdQty,
        Description: req.body.Description,
        Stock: req.body.Stock,
    }, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "outlet not found with id " + req.params.id
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    product.findByIdAndRemove(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.id
                });
            }
            res.send({ message: "product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
};
