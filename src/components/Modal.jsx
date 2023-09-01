import deleteIcon from '../assets/deleteIcon.png'
import axios from 'axios';


function Modal( {handleTaskDelete, task, taskdetails, closeModal} ) {



  return (
    <div className="flex">
    <div>
    <h2>{task.task_name}</h2>
    <p>Priority level: {task.priority_level}</p>
    <p>Due Date: {task.due_date}</p>
    <p>Reoccuring: Every {task.reoccurance} day(s)</p>
    </div>
    
    <img onClick={() => {
        handleTaskDelete(task.id);
        closeModal();
        }} className="w-6 h-4 ml-2" src={deleteIcon} alt="Delete" />
    
    </div>
  )
}

export default Modal