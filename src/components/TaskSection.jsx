import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import axios from "axios";
import ContextMenuContainer from "./ContextMenuContainer"
import { useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion"

function TaskSection( {userID, taskCompleteNotify, sectionTitle} ) {

    const apiUrl = import.meta.env.VITE_API_URL;
    const user_id = userID;

    const inputRef = useRef();


    const [tasksData, setTasksData] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const [inputPopup, setInputPopup] = useState({ isVisible: false, label: '' });
    const [groupInputPopup, setGroupInputPopup] = useState({ isVisible: false, label: '' });

    const showInputField = (label) => {
      setInputPopup({ isVisible: true, label });
    };

    const showGroupInputField = (label, groupId) => {
      setGroupInputPopup({ isVisible: true, label, groupId });
    };

    const handleTaskDelete = (taskId) => {
      axios
        .delete(`${apiUrl}/${user_id}/tasks/${taskId}`)
        .then(() => {
          setTasksData((prevData) => {
            return {
              tasks: prevData.tasks?.filter((task) => task.id !== taskId),
              tasksdetails: prevData.tasksdetails?.filter((detail) => detail.task_id !== taskId),
              taskgroups: prevData.taskgroups
            };
          });
        })
        
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    };

    const handleTaskGroupDelete = (taskGroupId) => {
      axios
        .delete(`${apiUrl}/${user_id}/taskgroups/${taskGroupId}`)
        .then(() => {
          setTasksData((prevData) => {
            return {
              tasks: prevData.tasks?.filter((task) => task.taskgroup_id !== taskGroupId),
              tasksdetails: prevData.tasksdetails?.filter((detail) => detail.taskgroup_id !== taskGroupId),
              taskgroups: prevData.taskgroups?.filter((taskGroup) => taskGroup.id !== taskGroupId)
            };
          });
        })
        
        .catch((error) => {
          console.error("Error deleting Task Group:", error);
        });
    };

    const handleTaskDetailAdd = (taskId, newTaskDetail) => {
      axios
          .post(`${apiUrl}/${user_id}/tasks/${taskId}`, { taskDetail: newTaskDetail, taskId })
          .then((response) => {
              setTasksData((prevData) => ({
                  ...prevData,
                  tasksdetails: [...prevData.tasksdetails, response.data.taskDetail]
              }));
          })
          .catch((error) => {
              console.error("Error adding Task Detail:", error);
          });
  };
  

    useEffect(() => {
      console.log("Fetching data for user:", user_id)
      axios.get(`${apiUrl}/${user_id}/tasks`)
      .then((response) => {
        console.log("tasksData: ", response.data)
        setTasksData(response.data);
  
      }).catch(error => {
        console.error('Error fetching tasks data:', error);
      });
    }, [])


    const contextMenuItems = [
      { label: "Add Task", action: "add_task" },
      { label: "Add Group", action: "add_group" },
    ];

    const contextMenuItems_TaskGroup = [
      { label: "Create New Task", action: "new_task" },
      { label: "Delete Group", action: "delete_group" },
      

    ];

  return (
    <motion.div 
    className="rounded-lg pl-5 md:pl-3 pt-4 md:pt-2 pb-2 md:mt-2"
    animate={
      isOpen ? {
        backgroundImage: "linear-gradient(to right, rgba(211, 211, 211, 0.2), white)"}
    : {  backgroundImage: ""}
    }
    transition={{ duration: 1 }}
    >
      <ContextMenuContainer userID={userID} items={contextMenuItems} showInputField={showInputField}>
        <motion.h2 className="text-2xl md:text-lg font-semibold text-primary-navy" 
        onClick={() => {setIsOpen(!isOpen)}}
        initial={{ scale: 1 }} 
        whileHover={{ scale: 1.05 }}
        >{sectionTitle}
        
        </motion.h2>
        </ContextMenuContainer>

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
              />
              <button onClick={() => {
                const value = inputRef.current.value;
                if (inputPopup.label == "Task") {
                  console.log('user_id:', user_id);
                axios.post(`${apiUrl}/${user_id}/tasks`, {"task": {"task_name": value, "user_id": user_id}})
                .then((response) => {
                  setTasksData(prevData => ({
                    ...prevData,
                    tasks: [...prevData.tasks, response.data.task]
                  }));
                }).catch((err) => {
                  console.log(err);
                } )} else if (inputPopup.label == "Group") {
                  // console.log("group fired");
                  axios.post(`${apiUrl}/${user_id}/taskgroups`, {"taskGroup": {"taskgroup_name": value, "user_id": user_id}})
                .then((response) => {
                  setTasksData(prevData => ({
                    ...prevData,
                    taskgroups: [...prevData.taskgroups, response.data.taskGroup]
                  }));
                }).catch((err) => {
                  console.log(err);
                })
                }

                setInputPopup({ isVisible: false, label: '' });
              }}>
                Submit
              </button>
            </motion.div>
          )}

        <AnimatePresence>
        {(isOpen) ? 
            <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            >
            <TaskList userID={userID} handleTaskDetailAdd={handleTaskDetailAdd} taskCompleteNotify={taskCompleteNotify} setGroupInputPopup={setGroupInputPopup} setTasksData={setTasksData} groupInputPopup={groupInputPopup} handleTaskGroupDelete={handleTaskGroupDelete} showGroupInputField={showGroupInputField} contextMenuItems_TaskGroup={contextMenuItems_TaskGroup} handleTaskDelete={handleTaskDelete} taskgroups={tasksData.taskgroups} tasks={tasksData.tasks} taskdetails={tasksData.tasksdetails} />
            </motion.div>
            : null
        }
        </AnimatePresence>
        
        </motion.div>
  )
}

export default TaskSection