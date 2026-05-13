const express = require('express');
const { userAuthentication } = require('../middleware/authentication');
const { createTask, updateTask, deleteTask, getTasksBySelectedDate } = require('../controllers/taskController');
const router = express.Router();


router.route('/create').post(userAuthentication, createTask);
router.route("/by-date").get(
    userAuthentication,
    getTasksBySelectedDate
);
router.route('/update/:id').patch(userAuthentication, updateTask);
router.route('/delete/:id').delete(userAuthentication, deleteTask);

module.exports = router;