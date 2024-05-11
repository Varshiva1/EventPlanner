const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event_controller');

router.post('/events', eventController.create);
router.get('/events', eventController.findAll);
router.put('/events/:id', eventController.update);

module.exports = router;