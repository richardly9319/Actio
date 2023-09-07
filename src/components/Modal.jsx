import React, { useState } from 'react';
import deleteIcon from '../assets/deleteIcon.png';

function Modal({setIsOpen, handleTaskDetailAdd, handleTaskDelete, task, closeModal }) {
  const [showInput, setShowInput] = useState(false);
  const [note, setNote] = useState('');

  const readableDueDate = new Date(task.due_date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleAddNote = () => {
    handleTaskDetailAdd(task.id, { detail_text: note });
    setNote('');
    setShowInput(false);
    closeModal();
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col justify-center bg-white rounded-lg p-4 shadow-lg"
    style={{ background: "linear-gradient(to left, rgba(248, 248, 248, 1) 0%, rgba(255,255,255, 1) 100%)" }}
    >
      <div className="flex justify-between w-full">
        <h2 className="text-lg font-semibold">{task.task_name}</h2>
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
      <p className="text-md mt-2">Priority level: {task.priority_level}</p>
      <p className="text-md mt-2">Due Date: {readableDueDate}</p>
      {(task.reoccurance != 0) && (
        <p className="text-md mt-2">Reoccurring: Every {task.reoccurance} day(s)</p>
      )}
      <p className="text-lg mt-2 hover:font-semibold cursor-pointer text-blue-800" onClick={toggleInput}>Add Note</p>
      {showInput && (
        <div className="mt-2">
          <input 
            type="text" 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            className="border rounded-lg p-2 w-full"
          />
          <button 
            onClick={handleAddNote}
            className="mt-2 w-16 bg-blue-800 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
          
        </div>
      )}

<p 
onClick={ () => { handleTaskDelete(task.id);
  closeModal();}}
className="text-lg mt-2 hover:font-semibold cursor-pointer text-orange-700" >Postpone</p>
    </div>
  );
}

export default Modal;
