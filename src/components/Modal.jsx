import React from 'react';
import deleteIcon from '../assets/deleteIcon.png';

function Modal({ handleTaskDelete, task, closeModal }) {
  const readableDueDate = new Date(task.due_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col justify-center bg-white rounded-lg p-4 shadow-lg"
    style={{ background: "linear-gradient(to left, rgba(245, 245, 245, 1) 0%, rgba(255,255,255, 1) 100%)" }}
    >
      <div className="flex justify-between w-full">
        <h2 className="text-lg font-semibold">Task Name: {task.task_name}</h2>
        <img
          onClick={() => {
            handleTaskDelete(task.id);
            closeModal();
          }}
          className="w-6 h-5 cursor-pointer"
          src={deleteIcon}
          alt="Delete"
        />
      </div>
      <p className="text-lg mt-2">Priority level: {task.priority_level}</p>
      <p className="text-lg mt-2">Due Date: {readableDueDate}</p>
      {(task.reoccurance != 0) && (
        <p className="text-lg mt-2">Reoccurring: Every {task.reoccurance} day(s)</p>
      )}


      
    </div>
  );
}

export default Modal;
