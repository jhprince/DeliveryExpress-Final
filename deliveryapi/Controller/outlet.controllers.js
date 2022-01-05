const outlet = require('../models/outlet.model.js');
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    outlet.find()
        .then(outlet => {
            res.send(outlet);
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
    const ot = new outlet({
        Name: req.body.Name,
        Address: req.body.Address,
        ContactNumber: req.body.ContactNumber,
        ContactPerson: req.body.ContactPerson,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
    });
    // Save user in the database
    ot.save()
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
    outlet.findById(req.params.id)
        .then(outlet => {
            if (!outlet) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(outlet);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "outlet not found with id " + req.params.id
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
    outlet.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        Address: req.body.Address,
        ContactNumber: req.body.ContactNumber,
        ContactPerson: req.body.ContactPerson,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
    }, { new: true })
        .then(outlet => {
            if (!outlet) {
                return res.status(404).send({
                    message: "outlet not found with id " + req.params.id
                });
            }
            res.send(Outlet);
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
    outlet.findByIdAndRemove(req.params.id)
        .then(outlet => {
            if (!outlet) {
                return res.status(404).send({
                    message: "outlet not found with id " + req.params.id
                });
            }
            res.send({ message: "outlet deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "outlet not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
};
