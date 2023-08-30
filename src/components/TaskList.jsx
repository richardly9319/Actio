import Detail from "./Detail";
import Task from "./Task";

function TaskList( {taskgroups, tasks, taskdetails} ) {
  return (
    <ul className="ml-4">
        
        {tasks.map((task, index) => {
            return <Task taskId={task.id} taskName={task.task_name} key={index} taskdetails={taskdetails}/>
        })}
    </ul>
  )
}

export default TaskList