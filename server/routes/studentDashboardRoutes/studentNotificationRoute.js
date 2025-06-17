const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/studentControllers/studentNotificationController');

router.get('/:user_PK', notificationController.getNotifications);
router.put('/markAllAsRead/:user_PK', notificationController.markAllAsRead);

module.exports = router;
