import React from 'react';
import TaskCard from './TaskCard';

export default class DillyDally extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tasks: []
    };
  }
  
  componentDidMount(){
    fetch('http://localhost:8080/tasks',{
      method:'GET'
    })
    .then(response => {
      return response.json();
    })
  }
  
  render(){
    
    return(
      
      <div className={'task'}>
        <TaskCard />
        {this.tasks}
      </div>
    )
  }
}