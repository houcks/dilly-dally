import Task from "./Task";
import Status from "./Status";
import DueDate from "./DueDate";
import Delete from "./Delete";

const TaskCard = (props) => {
  return (
    <tr>
      <Task task={props.task} />
      <Status
        status={props.task.complete}
        taskID={props.task.id}
        className="status-dropdown"
      />
      <DueDate date={props.task.due_by} taskID={props.task.id} />
      <Delete taskID={props.task.id} remove={props.remove} />
    </tr>
  );
};

export default TaskCard;
