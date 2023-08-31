import { useState, useEffect } from "react";
import Detail from "./Detail";
import TaskList from "./TaskList";
import Task from "./Task";


function TaskGroup( {groupName, tasks, taskdetails} ) {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2 className="text-tertiary-color" onClick={() => {setIsOpen(!isOpen)}}>{groupName}</h2>
      
        
        {(isOpen) ? 
        <ul className="ml-4">
        {tasks?.map((task, index) => {
            return <Task taskId={task.id} taskName={task.task_name} key={index} taskdetails={taskdetails}/>
        })}
        </ul>
        
         : <></>
      }
        
    </div>
  )
}

export default TaskGroup