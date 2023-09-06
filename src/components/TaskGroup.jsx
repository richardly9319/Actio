import { useState, useEffect } from "react";
import Detail from "./Detail";
import TaskList from "./TaskList";
import Task from "./Task";
import ContextMenuContainer from "./ContextMenuContainer"
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from 'react';
import axios from "axios";


function TaskGroup( {taskCompleteNotify, setGroupInputPopup, setTasksData, groupInputPopup, groupID, handleTaskGroupDelete, showGroupInputField, handleTaskDelete, groupName, tasks, taskdetails, contextMenuItems_TaskGroup} ) {

    const [isOpen, setIsOpen] = useState(false);

    const inputRef = useRef();

    const apiUrl = import.meta.env.VITE_API_URL;
    const user_id = 2;

  return (
    <div>
      <ContextMenuContainer groupID={groupID} handleTaskGroupDelete={handleTaskGroupDelete} items={contextMenuItems_TaskGroup} showGroupInputField={showGroupInputField}>
      <motion.h2 
      className="text-orange-700 font-semibold mt-1" 
      onClick={() => {setIsOpen(!isOpen)}}
      initial={{ scale: 1 }} 
      whileHover={{ scale: 1.02 }}
      >{groupName}:</motion.h2>
      </ContextMenuContainer>
        
        {groupInputPopup.isVisible && groupID === groupInputPopup.groupId && (
          <div>
          <input
            ref={inputRef}
            type="text"
            placeholder={`Enter ${groupInputPopup.label} Name`}
          />
          <button onClick={() => {
            const value = inputRef.current.value;
            console.log("value", value);
            if (groupInputPopup.label == "New Task") {
      
            axios.post(`${apiUrl}/${user_id}/tasks`, {"task": {"task_name": value, "user_id": user_id, "taskgroup_id": groupID}})
            .then((response) => {
              console.log("responded");
              setTasksData(prevData => ({
                ...prevData,
                tasks: [...prevData.tasks, response.data.task]
              }));
            }).catch((err) => {
              console.log(err);
            } )}

            setGroupInputPopup({ isVisible: false, label: '' });
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
            return <Task taskCompleteNotify={taskCompleteNotify} handleTaskDelete={handleTaskDelete} task={task} key={index} taskdetails={taskdetails?.filter((detail) => {
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