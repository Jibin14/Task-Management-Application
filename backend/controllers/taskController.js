const Task = require('../models/tasks');

// ➤ Create Task
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            task
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ➤ Get All Tasks
exports.getTasksBySelectedDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Please provide a date",
      });
    }

    // Start of selected day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    // End of selected day
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      taskDate: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ taskDate: 1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ➤ Update Task
exports.updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json({
        success: true,
        task
    });
};

// ➤ Delete Task
exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        message: "Task deleted"
    });
};