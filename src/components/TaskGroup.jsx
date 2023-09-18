import { useState, useEffect } from "react";
import Detail from "./Detail";
import TaskList from "./TaskList";
import Task from "./Task";
import ContextMenuContainer from "./ContextMenuContainer";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from 'react';
import axios from "axios";

function TaskGroup({
  setContextMenuIsVisible, userID, handleTaskDetailAdd, taskCompleteNotify, setGroupInputPopup,
  setTasksData, groupInputPopup, groupID, handleTaskGroupDelete, showGroupInputField,
  handleTaskDelete, groupName, tasks, taskdetails, contextMenuItems_TaskGroup
}) {

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();
  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = userID;

  useEffect(() => {
    if (groupInputPopup.isVisible && groupID === groupInputPopup.groupId) {
        inputRef.current.focus();
    }
}, [groupInputPopup.isVisible, groupID]);

  useEffect(() => {
    // Function to check if clicked outside of the input
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setGroupInputPopup({ isVisible: false, label: '' });
      }
    };

    // Add the outside click checker to the event listener
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleTaskCreation = () => {
    const value = inputRef.current.value;
    console.log("groupInputPopup.label: ", groupInputPopup.label)
    if (groupInputPopup.label === "Item") {
      axios.post(`${apiUrl}/${user_id}/tasks`, {
        "task": {
          "task_name": value,
          "user_id": user_id,
          "taskgroup_id": groupID
        }
      })
      .then((response) => {
        setTasksData(prevData => ({
          ...prevData,
          tasks: [...prevData.tasks, response.data.task]
        }));
      }).catch((err) => {
        console.log(err);
      });
    }
    setGroupInputPopup({ isVisible: false, label: '' });
    setIsOpen(true);
    setContextMenuIsVisible(false)
  };

  return (
    <div>
      <ContextMenuContainer setContextMenuIsVisible={setContextMenuIsVisible} userID={userID} groupID={groupID} handleTaskGroupDelete={handleTaskGroupDelete} items={contextMenuItems_TaskGroup} showGroupInputField={showGroupInputField}>
        <h2 
          className="text-primary-orange md:cursor-pointer font-medium mt-1 text-lg md:text-base" 
          onClick={() => { setIsOpen(!isOpen) }}
          
        >
          {groupName}
          {(isOpen) ? "" : ":"}
        </h2>
      </ContextMenuContainer>
      
      

      <AnimatePresence>
        {isOpen && 
          <motion.div
          initial={{ opacity: 0, y: 0, scaleY: 0.5 }}   // Starts above with scaled down completely on the Y-axis
    animate={{ opacity: 1, y: 0, scaleY: 1 }}     // Falls down to its position while opening up
    transition={{ duration: 0.2 }}
    style={{ transformOrigin: 'top' }} 
          >
            <ul className="ml-4">
              {tasks?.map((task, index) => {
                return (
                  <Task 
                    taskGroup={groupName}
                    userID={userID} 
                    handleTaskDetailAdd={handleTaskDetailAdd} 
                    taskCompleteNotify={taskCompleteNotify} 
                    handleTaskDelete={handleTaskDelete} 
                    task={task} 
                    key={index} 
                    taskdetails={taskdetails?.filter((detail) => {
                      return detail.task_id == task.id
                    })}
                  />
                )
              })}
            </ul>
          </motion.div>
        }
      </AnimatePresence>

      {groupInputPopup.isVisible && groupID === groupInputPopup.groupId && (
        <div className="pl-4">
          <input
            ref={inputRef}
            type="text"
            placeholder={`Enter ${groupInputPopup.label} Name`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                console.log("key fired");
                handleTaskCreation();
              }
            }}
            autoFocus
          />
        </div>
      )}
        
      
    </div>
  )
}

export default TaskGroup;
