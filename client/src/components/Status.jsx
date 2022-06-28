import React, { useState } from "react";

const Status = (props) => {
  const [status, setStatus] = useState(props.status);

  function handleChange(event) {
    const completion = {
      complete: !status,
      id: props.taskID,
    };
    fetch("http://localhost:8080/tasks", {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(completion),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }).then(setStatus(!status));
  }

  return (
    <td className="status-dropdown">
      <select onChange={handleChange}>
        <option value={status ? "Complete" : "Incomplete"}>
          {props.status ? "Complete" : "Incomplete"}
        </option>
        <option value={!status ? "Complete" : "Incomplete"}>
          {!props.status ? "Complete" : "Incomplete"}
        </option>
      </select>
    </td>
  );
};

export default Status;
