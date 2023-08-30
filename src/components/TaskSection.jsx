import { useState, useEffect } from "react";
import Item from "./Detail";
import TaskList from "./TaskList";


function TaskSection( {sectionTitle, taskgroups, tasks, taskdetails} ) {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
        {/* <h1>{tasks ? <p>{tasks[0].task_name}</p> : <p></p>}</h1> */}
        <h2 className="inline text-quaternary-color" onClick={() => {setIsOpen(!isOpen)}}>{sectionTitle}</h2>
        {(isOpen) ? 
            <TaskList taskgroups={taskgroups} tasks={tasks} taskdetails={taskdetails} />
            : <></>
        }
        
        </div>
  )
}

export default TaskSection