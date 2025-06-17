const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/studentControllers/studentNotificationController');

router.get('/', notificationController.getNotifications);
router.put('/:id/read', notificationController.markAsRead);

module.exports = router;
