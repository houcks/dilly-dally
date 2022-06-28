import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DueDate = (props) => {
  const [dueDate, setDueDate] = useState(props.date);

  function changeDate(selectedDate) {
    setDueDate(selectedDate);
    const newDate = {
      due_by: selectedDate,
      id: props.taskID,
    };
    fetch("http://localhost:8080/tasks", {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(newDate),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }
  return (
    <td>
      <DatePicker
        selected={new Date(dueDate)}
        onChange={(selectedDate) => changeDate(selectedDate)}
      />
    </td>
  );
};

export default DueDate;
