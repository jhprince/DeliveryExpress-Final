const order = require('../models/order.model.js');
const orderItem = require('../models/orderItem.model.js');
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    order.find()
        .then(order => {
            res.send(order);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of Orders."
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
    const ord = new order({
        OrderDate: new Date(),
        EstimatedDeliveryDate: req.body.EstimatedDeliveryDate,
        Comments: req.body.Comments,
        Status: req.body.Status,
        OutletId: req.body.OutletId,
        OutletName: req.body.OutletName,
        TotalOrderQty: req.body.TotalOrderQty,
        TotalOrderPrice: req.body.TotalOrderPrice,
    });
    // Save user in the database
    ord.save()
        .then(data => {
            // save order items
            const orderItems = req.body.orderItems;
            orderItems.forEach(element => {
                const ot = new orderItem({
                    OrderNo: data._id,
                    ItemId: element.id,
                    Name: element.name,
                    UnitPrice: element.unitPrice,
                    Qty: element.qty
                });
                ot.save().then(data => {});
            });
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new order."
            });
        });
};
// Find a single User with a id
exports.findOne = (req, res) => {
    order.findById(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
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
    order.findByIdAndUpdate(req.params.id, {
        EstimatedDeliveryDate: req.body.EstimatedDeliveryDate,
        Comments: req.body.Comments,
        Status: req.body.Status,
        OutletId: req.body.OutletId,
        TotalOrderQty: req.body.TotalOrderQty,
        TotalOrderPrice: req.body.TotalOrderPrice,
    }, { new: true })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "outlet not found with id " + req.params.id
                });
            }
            res.send(order);
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
    order.findByIdAndRemove(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
                });
            }
            res.send({ message: "order deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "order not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.id
            });
        });
};
