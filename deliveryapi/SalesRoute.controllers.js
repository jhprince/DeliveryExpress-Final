const SalesRoute = require('../models/SalesRoute.model.js');
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    SalesRoute.find()
        .then(SalesRoute => {
            res.send(SalesRoute);
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
    const sr = new SalesRoute({
        Name: req.body.Name,
        RouteDate: req.body.RouteDate,
        SalesPersonId: req.body.SalesPersonId,
        Outlets: req.body.Outlets,
    });
    // Save user in the database
    sr.save()
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
    SalesRoute.findById(req.params.id)
        .then(SalesRoute => {
            if (!SalesRoute) {
                return res.status(404).send({
                    message: "SalesRoute not found with id " + req.params.id
                });
            }
            res.send(SalesRoute);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "SalesRoute not found with id " + req.params.id
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
    SalesRoute.findByIdAndUpdate(req.params.id, {
        Name: req.body.Name,
        RouteDate: req.body.RouteDate,
        SalesPersonId: req.body.SalesPersonId,
        Outlets: req.body.Outlets,
    }, { new: true })
        .then(SalesRoute => {
            if (!SalesRoute) {
                return res.status(404).send({
                    message: "SalesRoute not found with id " + req.params.id
                });
            }
            res.send(SalesRoute);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "SalesRoute not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    SalesRoute.findByIdAndRemove(req.params.id)
        .then(SalesRoute => {
            if (!SalesRoute) {
                return res.status(404).send({
                    message: "SalesRoute not found with id " + req.params.id
                });
            }
            res.send({ message: "SalesRoute deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "SalesRoute not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
};
