import ReactModal from 'react-modal';
import { useState } from 'react';

import Modal from './Modal';
import DetailList from './DetailList';

function Task( {taskId, taskName, taskdetails} ) {


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
        <Modal itemName={taskName} /> </ReactModal>
    <li className="inline-block" onContextMenu={(e) => {
        e.preventDefault();
        openModal();
      }} onClick={() => {setIsOpen(!isOpen)}} >{taskName}
      </li>
    
    {(isOpen) ? 
      <DetailList details={taskdetails.filter((taskdetail) => {
        return taskdetail.task_id == taskId
    })}/> : <></>
    }
    
    </div>
  )
}

export default Task