const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/EventController');

router.get('/add', EventsController.createEvent);
router.post('/add', EventsController.addEvent);
router.post('/remove', EventsController.removeEvent);
router.get('/edit/:id', EventsController.updateEvent);
router.post('/edit', EventsController.updateEventPost);
router.post('/updatestatus', EventsController.toggleEventStatus);
router.get('/', EventsController.showEvents);

module.exports = router;