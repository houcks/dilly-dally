import React from "react";
import TaskCard from "./TaskCard";

const Table = (props) => {
  return (
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th> Task </th>
          <th> Status </th>
          <th> Due By </th>
          <th> Delete Task </th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map((element) => (
          <TaskCard
            task={element}
            key={element.id}
            update={props.update}
            remove={props.remove}
          />
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
