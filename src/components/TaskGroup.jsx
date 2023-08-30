import { useState, useEffect } from "react";
import Item from "./Detail";
import TaskList from "./TaskList";


function TaskGroup( {groupTitle, tasks, taskdetails} ) {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
        <h2 className="inline text-quaternary-color" onClick={() => {setIsOpen(!isOpen)}}>{sectionTitle}</h2>
        {(isOpen) ? 
            <TaskList tasks={tasks} taskdetails={taskdetails} />
            : <></>
        }
        
        </div>
  )
}

export default TaskGroup