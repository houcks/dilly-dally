import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = (props) => {
  const [newTask, setNewTask] = useState("Enter New Task");
  const [newDate, setNewDate] = useState(new Date());

  function addNewTask() {
    const taskAndDate = {
      task: newTask,
      date: newDate,
    };
    fetch("http://localhost:8080/tasks", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(taskAndDate),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((result) => result.json())
      .then((data) => props.add(data));
  }
  return (
    <div className="form-container">
      <form>
        <label className="task-label">New Task:</label>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <label className="date-label">Due Date:</label>
        <DatePicker
          selected={new Date(newDate)}
          onChange={(selectedDate) => setNewDate(selectedDate)}
        />
        <input
          type="submit"
          id="submit-button"
          value={"Add Task"}
          onClick={(event) => {
            event.preventDefault();
            addNewTask();
          }}
        />
      </form>
    </div>
  );
};

export default AddTask;
