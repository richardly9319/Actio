import { useState, useEffect } from "react";
import Detail from "./Detail";
import TaskList from "./TaskList";
import Task from "./Task";
import ContextMenuContainer from "./ContextMenuContainer"
import { motion, AnimatePresence } from "framer-motion";


function TaskGroup( {groupInputPopup, groupID, handleTaskGroupDelete, showGroupInputField, handleTaskDelete, groupName, tasks, taskdetails, contextMenuItems_TaskGroup} ) {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ContextMenuContainer groupID={groupID} handleTaskGroupDelete={handleTaskGroupDelete} items={contextMenuItems_TaskGroup} showGroupInputField={showGroupInputField}>
      <motion.h2 
      className="text-orange-700 font-semibold" 
      onClick={() => {setIsOpen(!isOpen)}}
      initial={{ scale: 1 }} 
      whileHover={{ scale: 1.02 }}
      >{groupName}:</motion.h2>
      </ContextMenuContainer>
        
        {groupInputPopup.isVisible && (
          <div>
          <input
            // ref={inputRef}
            type="text"
            placeholder={`Enter ${groupInputPopup.label} Name`}
          />
          <button onClick={() => {
            // handle submit logic here
            const value = inputRef.current.value;
          }}>Submit</button>
          </div>
        )}

        <AnimatePresence>
        {(isOpen) ? 

        <motion.div
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
        <ul className="ml-4">
        {tasks?.map((task, index) => {
            return <Task handleTaskDelete={handleTaskDelete} task={task} key={index} taskdetails={taskdetails?.filter((detail) => {
              return detail.task_id == task.id
            })}/>
        })}
        </ul>
        </motion.div>
         : null
      }
      </AnimatePresence>
        
    </div>
  )
}

export default TaskGroup