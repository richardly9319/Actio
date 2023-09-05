import Detail from "./Detail";
import Task from "./Task";
import TaskGroup from "./TaskGroup";

function TaskList( {groupInputPopup, handleTaskGroupDelete, showGroupInputField, taskgroups, tasks, taskdetails, handleTaskDelete, contextMenuItems_TaskGroup} ) {

  return (
    <ul className="ml-4">
        
        {tasks?.filter((task) => {
          return task.taskgroup_id == null
        })?.map((task, index) => {
            return <Task handleTaskDelete={handleTaskDelete} task={task} key={index} taskdetails={taskdetails?.filter((detail) => {
              return detail.task_id == task.id
            })}/>
        })}

        <div className="mt-1">
        {taskgroups?.map((taskgroup, index) => {
            return <TaskGroup groupInputPopup={groupInputPopup} handleTaskGroupDelete={handleTaskGroupDelete} showGroupInputField={showGroupInputField} contextMenuItems_TaskGroup={contextMenuItems_TaskGroup} handleTaskDelete={handleTaskDelete} groupID={taskgroup.id} groupName={taskgroup.taskgroup_name} tasks={tasks?.filter((task) => {
              return taskgroup.id == task.taskgroup_id
            })} key={index} taskdetails={taskdetails}/>
        })}
        </div>
    </ul>
  )
}

export default TaskList