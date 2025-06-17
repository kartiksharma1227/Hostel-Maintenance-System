const express = require('express');
const router = express.Router();
const {getNotifications,markAllAsRead,markAsRead} = require('../../controllers/studentControllers/studentNotificationController');

router.get('/:user_PK', getNotifications);
router.put('/markAllAsRead/:user_PK', markAllAsRead);
router.put('/markAsRead/:notification_PK', markAsRead);
module.exports = router;
