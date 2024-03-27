const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
const { add, getTodos, edit, remove, getOneTodo } = require('../controllers/todos')

// /api/todos
router.get('/', auth, getTodos)
// /api/todos/:id
router.get('/:id', auth, getOneTodo)
// /api/todos/add
router.post('/add', auth, add)
// /api/todos/remove/:id
router.post('/remove/:id', auth, remove)
// /api/todos/edit/:id
router.put('/edit/:id', auth, edit)

module.exports = router;