const { Router } = require('express');
const controllers = require('../controllers/user.js');
const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.get('/users', controllers.getUsers)
router.get('/users/:id', controllers.getUserById)
router.post('/create', controllers.createUser)
router.patch('/users/:id', controllers.updateUser)

module.exports = router