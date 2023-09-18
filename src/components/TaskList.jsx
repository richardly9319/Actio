import Detail from "./Detail";
import Task from "./Task";
import TaskGroup from "./TaskGroup";
import { motion, AnimatePresence } from "framer-motion"

function TaskList( {setContextMenuIsVisible, handleKeyDown, inputRef, inputPopup, userID, handleTaskDetailAdd, taskCompleteNotify, setGroupInputPopup, setTasksData, groupInputPopup, handleTaskGroupDelete, showGroupInputField, taskgroups, tasks, taskdetails, handleTaskDelete, contextMenuItems_TaskGroup} ) {

  return (
    <ul className="ml-4">
        
        {tasks?.filter((task) => {
          return task.taskgroup_id == null
        })?.map((task, index) => {
            return <Task taskGroup="None" userID={userID} handleTaskDetailAdd={handleTaskDetailAdd} taskCompleteNotify={taskCompleteNotify} handleTaskDelete={handleTaskDelete} task={task} key={index} taskdetails={taskdetails?.filter((detail) => {
              return detail.task_id == task.id
            })}/>
        })}

            {inputPopup.isVisible && (
                <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                >
              <input
                ref={inputRef}
                type="text"
                placeholder={`Enter ${inputPopup.label} Name`}
                onKeyDown={handleKeyDown}
                autoFocus
                />
              
            </motion.div>
          )}

        <div className="mt-1">
        {taskgroups?.map((taskgroup, index) => {
            return <TaskGroup setContextMenuIsVisible={setContextMenuIsVisible} userID={userID} handleTaskDetailAdd={handleTaskDetailAdd} taskCompleteNotify={taskCompleteNotify} setGroupInputPopup={setGroupInputPopup} setTasksData={setTasksData} groupInputPopup={groupInputPopup} handleTaskGroupDelete={handleTaskGroupDelete} showGroupInputField={showGroupInputField} contextMenuItems_TaskGroup={contextMenuItems_TaskGroup} handleTaskDelete={handleTaskDelete} groupID={taskgroup.id} groupName={taskgroup.taskgroup_name} tasks={tasks?.filter((task) => {
              return taskgroup.id == task.taskgroup_id
            })} key={index} taskdetails={taskdetails}/>
        })}
        </div>
    </ul>
  )
}

export default TaskList