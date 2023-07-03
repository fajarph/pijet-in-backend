const { Router } = require('express');
const controllers = require('../controllers/order.js');
const middleware = require("../middleware/authUser.js")
const router = Router()

router.get('/orders', controllers.getOrders)
router.get('/orders/:id', controllers.getOrderById)
router.post('/orders', middleware.verifyUser, controllers.createOrder)

module.exports = router