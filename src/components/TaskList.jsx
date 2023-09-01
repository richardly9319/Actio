import Detail from "./Detail";
import Task from "./Task";
import TaskGroup from "./TaskGroup";

function TaskList( {taskgroups, tasks, taskdetails, handleTaskDelete} ) {

  return (
    <ul className="ml-4">
        
        {tasks?.filter((task) => {
          return task.taskgroup_id == null
        })?.map((task, index) => {
            return <Task handleTaskDelete={handleTaskDelete} task={task} key={index} taskdetails={taskdetails?.filter((detail) => {
              return detail.task_id == task.id
            })}/>
        })}

        {taskgroups?.map((taskgroup, index) => {
            return <TaskGroup handleTaskDelete={handleTaskDelete} groupName={taskgroup.taskgroup_name} tasks={tasks?.filter((task) => {
              return taskgroup.id == task.taskgroup_id
            })} key={index} taskdetails={taskdetails}/>
        })}
    </ul>
  )
}

export default TaskList