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
          .post(`${apiUrl}/${user_id}/tasks/${taskId}`, { taskDetail: newTaskDetail, taskId, userID })
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleSubmit();
    }
}


const handleSubmit = () => {
  const value = inputRef.current.value;
  if (inputPopup.label === "Item") {
      axios.post(`${apiUrl}/${user_id}/tasks`, {"task": {"task_name": value, "user_id": user_id}})
      .then((response) => {
        console.log("axios fired")
          setTasksData(prevData => ({
              ...prevData,
              tasks: [...prevData.tasks, response.data.task]
          }));
      }).catch((err) => {
          console.log(err);
      })
  } else if (inputPopup.label === "Group") {
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
}

  

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

    useEffect(() => {
      // Function to check if clicked outside of the input
      const handleOutsideClick = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          setInputPopup({ isVisible: false, label: '' });
        }
      };
    
      // Add the outside click checker to the event listener
      document.addEventListener('mousedown', handleOutsideClick);
    
      // Clean up the event listener on component unmount
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);

    useEffect(() => {
      if (inputPopup.isVisible) {
          inputRef.current.focus();
      }
  }, [inputPopup.isVisible]);


    const contextMenuItems = [
      { label: "Add Item", action: "add_task" },
      { label: "Add Group", action: "add_group" },
    ];

    const contextMenuItems_TaskGroup = [
      { label: "Add Item", action: "new_task" },
      { label: "Delete Group", action: "delete_group" },
      

    ];

  return (
    <motion.div 
    className="md:rounded-lg pl-5 md:pl-3 pt-4 md:pt-2 pb-2 md:mt-2 pr-4"
    // animate={
    //   isOpen ? {
    //     backgroundImage: "linear-gradient(to right, rgba(211, 211, 211, 0.2), white)"}
    // : {  backgroundImage: ""}
    // }
    // transition={{ duration: 1 }}
    >
      <ContextMenuContainer userID={userID} items={contextMenuItems} showInputField={showInputField}>
        <motion.h2 className="md:cursor-pointer text-2xl md:text-lg font-semibold text-black" 
        onClick={() => {
          setIsOpen(!isOpen);
          
        }}
        initial={{ scale: 1 }} 
        whileHover={{ scale: 1.05 }}
        >{sectionTitle}
        
        </motion.h2>
        </ContextMenuContainer>
        
        

        <AnimatePresence>
        {(isOpen) ? 
            <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.35 }}   // Starts above with scaled down completely on the Y-axis
    animate={{ opacity: 1, y: 0, scaleY: 1 }}     // Falls down to its position while opening up
    transition={{ duration: 0.2 }}
    style={{ transformOrigin: 'top' }} 
            >
            <TaskList inputPopup={inputPopup} inputRef={inputRef} handleKeyDown={handleKeyDown} userID={userID} handleTaskDetailAdd={handleTaskDetailAdd} taskCompleteNotify={taskCompleteNotify} setGroupInputPopup={setGroupInputPopup} setTasksData={setTasksData} groupInputPopup={groupInputPopup} handleTaskGroupDelete={handleTaskGroupDelete} showGroupInputField={showGroupInputField} contextMenuItems_TaskGroup={contextMenuItems_TaskGroup} handleTaskDelete={handleTaskDelete} taskgroups={tasksData.taskgroups} tasks={tasksData.tasks} taskdetails={tasksData.tasksdetails} />
            </motion.div>
            : null
        }
        </AnimatePresence>

    

<button onClick={() => {showInputField("Item")}} className="fixed bottom-5 right-5 md:bottom-8 md:right-8 w-12 h-12 bg-primary-navy text-white rounded-full 
                  hover:bg-gray-400 
                  active:bg-gray-500 active:scale-95 transform transition 
                  flex items-center justify-center text-xl font-bold">
    +
</button>


        
        </motion.div>
  )
}

export default TaskSection