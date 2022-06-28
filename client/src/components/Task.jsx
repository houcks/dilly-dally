import React, { useState } from "react";

const Task = (props) => {
  const [toggle, setToggle] = useState(true);
  const [task, setTask] = useState(props.task.task);

  function handleEdit(editedTask) {
    fetch("http://localhost:8080/tasks", {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(editedTask),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }

  return toggle ? (
    <td
      className={"status"}
      onDoubleClick={() => {
        setToggle(false);
      }}
    >
      {task}
    </td>
  ) : (
    <td className={"status"}>
      <input
        type="text"
        value={task}
        onChange={(event) => {
          setTask(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            const editedTask = {
              task: event.target.value,
              id: props.task.id,
            };
            handleEdit(editedTask);
            setToggle(true);
          }
        }}
      />
    </td>
  );
};

export default Task;
