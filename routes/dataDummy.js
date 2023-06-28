const { Router } = require('express');
const controllers = require('../controllers/dataDummy.js');
const router = Router()

router.post('/login', controllers.Login)
router.post('/register', controllers.register)

router.get('/data-dummy', controllers.getUsers)

module.exports = router