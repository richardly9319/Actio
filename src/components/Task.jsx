import ReactModal from 'react-modal';
import { useState } from 'react';

import Modal from './Modal';
import DetailList from './DetailList';

import axios from 'axios';

import { motion, AnimatePresence } from "framer-motion"

function Task( {handleTaskDelete, task, taskdetails} ) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = 2

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      
    <ReactModal appElement={document.getElementById('root')} isOpen={isModalOpen}
      onRequestClose={closeModal}>
        <motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      >
        <Modal handleTaskDelete={handleTaskDelete} task={task} taskdetails={taskdetails} closeModal={closeModal} /> 
        </motion.div>
        </ReactModal>
        
    <li className="flex text-black leading-relaxed" onContextMenu={(e) => {
        e.preventDefault();
        openModal();
      }} onClick={() => {setIsOpen(!isOpen)}} >
        <div 
      onClick={
        (e) => {e.stopPropagation();

        handleTaskDelete(task.id);
        alert('Task Completed!')
      
      }} 
        className='mr-1 hover:text-green-600'>〇 </div> {task.task_name}
      </li>
    
    {(isOpen) ? 
      <DetailList details={taskdetails?.filter((taskdetail) => {
        return taskdetail.task_id == task.id
    })}/> : <></>
    }
    
    </div>
  )
}

export default Task