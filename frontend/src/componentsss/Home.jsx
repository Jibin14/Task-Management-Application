import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
} from "react-bootstrap";

import {
  FaBell,
  FaMoon,
  FaPlus,
  FaFolder,
} from "react-icons/fa";

import Calendar from "react-calendar";

import instance from "../axios";

import "react-calendar/dist/Calendar.css";
import "./Home.css";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [date, setDate] =
    useState(new Date());

  const [tasks, setTasks] = useState(
    []
  );

  const navigate = useNavigate();

  // FETCH TASKS WHEN DATE CHANGES
  useEffect(() => {
    fetchTasksByDate();
  }, [date]);

  // GET TASKS
  const fetchTasksByDate =
    async () => {
      try {
        const selectedDate =
          date
            .toISOString()
            .split("T")[0];

        const { data } =
          await instance.get(
            "/tasks/by-date",
            {
              params: {
                date: selectedDate,
              },
            }
          );

        setTasks(data.tasks || []);
      } catch (err) {
        console.error(
          "Error fetching tasks:",
          err.response?.data ||
            err.message
        );
      }
    };

  // UPDATE TASK
  const toggleTask = async (
    taskId,
    completed
  ) => {
    try {
      await instance.patch(
        `/tasks/update/${taskId}`,
        {
          completed: !completed,
        }
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? {
                ...task,
                completed:
                  !completed,
              }
            : task
        )
      );
    } catch (err) {
      console.error(
        "Error updating task:",
        err.response?.data ||
          err.message
      );
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="home-page">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo-section">
          <div className="logo-box">
            <FaFolder />
          </div>

          <h2 className="logo-text">
            Listify
          </h2>
        </div>

        {/* CALENDAR */}
        <Card className="calendar-card">
          <Card.Body>
            <Calendar
              onChange={setDate}
              value={date}
            />
          </Card.Body>
        </Card>
      </div>

      {/* MAIN */}
      <div className="main-content">
        {/* TOPBAR */}
        <div className="topbar">
          <div></div>

          <div className="top-icons">
            <FaMoon className="top-icon" />

            <FaBell className="top-icon" />

            {/* PROFILE */}
            <div className="profile-wrapper">
              <img
                src="https://i.pravatar.cc/100"
                alt="profile"
                className="profile-img"
              />

              {/* LOGOUT DROPDOWN */}
              <div className="logout-dropdown">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={
                    handleLogout
                  }
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* TASKS */}
        <div className="today-section">
          <h1 className="today-title">
            Tasks for{" "}
            {date.toDateString()}
          </h1>

          {tasks.length === 0 ? (
            <p>No tasks found</p>
          ) : (
            tasks.map((task) => (
              <Card
                key={task._id}
                className={`task-card ${
                  task.completed
                    ? "blue-task"
                    : "yellow-task"
                }`}
              >
                <Card.Body className="task-body">
                  <Form.Check
                    checked={
                      task.completed
                    }
                    onChange={() =>
                      toggleTask(
                        task._id,
                        task.completed
                      )
                    }
                  />

                  <span className="task-text">
                    {task.title}
                  </span>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        {/* FLOATING BUTTON */}
        <Button
          className="floating-btn"
          onClick={() =>
            navigate("/tasks")
          }
        >
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default Home;