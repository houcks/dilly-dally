import React from "react";

const Delete = (props) => {
  function deleteTask() {
    const task = {
      id: props.taskID,
    };
    fetch("http://localhost:8080/tasks", {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      //.then(result => result.json())
      //.then(data => console.log(data))

      .then(props.remove(task.id));
  }
  return (
    <td>
      <button onClick={deleteTask}>Delete</button>
    </td>
  );
};

export default Delete;
