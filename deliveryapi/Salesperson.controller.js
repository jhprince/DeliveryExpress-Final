const Salesperson = require('../models/Salesperson.model.js');
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Salesperson.find()
        .then(Salesperson => {
            res.send(Salesperson);
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
    const sp = new Salesperson({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        UserId: req.body.UserId,
        PhoneNumber: req.body.PhoneNumber,
        Email: req.body.Email,
    });
    // Save user in the database
    sp.save()
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
    Salesperson.findById(req.params.id)
        .then(Salesperson => {
            if (!Salesperson) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.id
                });
            }
            res.send(Salesperson);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Salesperson not found with id " + req.params.id
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
    Salesperson.findByIdAndUpdate(req.params.id, {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        UserId: req.body.UserId,
        PhoneNumber: req.body.PhoneNumber,
        Email: req.body.Email,
    }, { new: true })
        .then(Salesperson => {
            if (!Salesperson) {
                return res.status(404).send({
                    message: "outlet not found with id " + req.params.id
                });
            }
            res.send(Salesperson);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "outlet not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    Salesperson.findByIdAndRemove(req.params.id)
        .then(Salesperson => {
            if (!Salesperson) {
                return res.status(404).send({
                    message: "Salesperson not found with id " + req.params.id
                });
            }
            res.send({ message: "Salesperson deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Salesperson not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
};
