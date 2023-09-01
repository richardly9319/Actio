import { useState, useEffect } from "react";
import Detail from "./Detail";
import TaskList from "./TaskList";
import Task from "./Task";


function TaskGroup( {handleTaskDelete, groupName, tasks, taskdetails} ) {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2 className="text-orange-700" onClick={() => {setIsOpen(!isOpen)}}>{groupName}</h2>
      
  
        {(isOpen) ? 
        <ul className="ml-4">
        {tasks?.map((task, index) => {
            return <Task handleTaskDelete={handleTaskDelete} task={task} key={index} taskdetails={taskdetails?.filter((detail) => {
              return detail.task_id == task.id
            })}/>
        })}
        </ul>
        
         : <></>
      }
        
    </div>
  )
}

export default TaskGroup