const express = require("express");

const {
    userAuthentication,
} = require("../middleware/authentication");

const {
    createTask,
    updateTask,
    deleteTask,
    getTasksBySelectedDate,
    completeTaskForToday,
} = require("../controllers/taskController");

const router = express.Router();

// CREATE TASK
router
    .route("/create")
    .post(
        userAuthentication,
        createTask
    );

// GET TASKS BY DATE
router
    .route("/by-date")
    .get(
        userAuthentication,
        getTasksBySelectedDate
    );

// COMPLETE TASK FOR TODAY ONLY
router
    .route("/complete/:id")
    .put(
        userAuthentication,
        completeTaskForToday
    );

// UPDATE TASK
router
    .route("/update/:id")
    .patch(
        userAuthentication,
        updateTask
    );

// DELETE TASK
router
    .route("/delete/:id")
    .delete(
        userAuthentication,
        deleteTask
    );

module.exports = router;