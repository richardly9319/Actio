import Detail from "./Detail";
import Task from "./Task";
import TaskGroup from "./TaskGroup";

function TaskList( {taskgroups, tasks, taskdetails} ) {
  console.log('tasks: ', tasks)
  console.log('taskgroups: ', taskgroups)

  return (
    <ul className="ml-4">
        
        {tasks.filter((task) => {
          return task.taskgroup_id == null
        }).map((task, index) => {
            return <Task taskId={task.id} taskName={task.task_name} key={index} taskdetails={taskdetails}/>
        })}

        {taskgroups.map((taskgroup, index) => {
            return <TaskGroup groupName={taskgroup.taskgroup_name} tasks={tasks.filter((task) => {
              return taskgroup.id == task.taskgroup_id
            })} key={index} taskdetails={taskdetails}/>
        })}
    </ul>
  )
}

export default TaskList