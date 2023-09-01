import ReactModal from 'react-modal';
import { useState } from 'react';

import Modal from './Modal';
import DetailList from './DetailList';

function Task( {handleTaskDelete, task, taskdetails} ) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        <Modal handleTaskDelete={handleTaskDelete} task={task} taskdetails={taskdetails} closeModal={closeModal} /> </ReactModal>
    <li className="inline-block text-purple-600" onContextMenu={(e) => {
        e.preventDefault();
        openModal();
      }} onClick={() => {setIsOpen(!isOpen)}} >{task.task_name}
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