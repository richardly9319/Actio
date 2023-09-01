import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import axios from "axios";

function TaskSection( {sectionTitle} ) {

    const apiUrl = import.meta.env.VITE_API_URL;
    const user_id = 2

    const [tasksData, setTasksData] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

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

    useEffect(() => {
      axios.get(`${apiUrl}/${user_id}/tasks`)
      .then((response) => {
        console.log("tasksData: ", response.data)
        setTasksData(response.data);
  
      }).catch(error => {
        console.error('Error fetching tasks data:', error);
      });
    }, [])

  return (
    <div className="">
        <h2 className="inline text-blue-700" onClick={() => {setIsOpen(!isOpen)}}>{sectionTitle}</h2>
        {(isOpen) ? 
            <TaskList handleTaskDelete={handleTaskDelete} taskgroups={tasksData.taskgroups} tasks={tasksData.tasks} taskdetails={tasksData.tasksdetails} />
            : <></>
        }
        
        </div>
  )
}

export default TaskSection