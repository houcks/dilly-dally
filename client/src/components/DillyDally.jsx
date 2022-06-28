import React, { Component } from "react";
import Table from "./Table";
import AddTask from "./AddTask";

export default class DillyDally extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/tasks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          tasks: data,
        });
      })
      .catch((err) => console.log(err));
  }
  //function for changing state in AddTask component
  addToTable = (task) => {
    this.setState({
      tasks: [...this.state.tasks, task],
    });
  };

  //Unfortunate prop drilling to update after deleting tasks
  removeFromTable = (taskID) => {
    const toRemove = this.state.tasks.find((obj) => obj.id === taskID);
    let index = this.state.tasks.indexOf(toRemove);
    let newTasks = this.state.tasks;
    newTasks.splice(index, 1);
    this.setState({
      tasks: newTasks,
    });
  };

  render() {
    return (
      <>
        <nav>Dilly Dally</nav>
        <AddTask add={this.addToTable} />
        <Table tasks={this.state.tasks} remove={this.removeFromTable} />
      </>
    );
  }
}
