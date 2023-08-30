import ReactModal from 'react-modal';
import { useState } from 'react';

import Modal from './Modal';
import DetailList from './DetailList';

function Task( {taskId, taskName, taskdetails} ) {

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Modal taskName={taskName} /> </ReactModal>
    <li className="inline-block" onClick={openModal} >{taskName}</li>
    {/* <ul className="list-disc ml-8">
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
    </ul> */}
    <DetailList details={taskdetails.filter((taskdetail) => {
        return taskdetail.task_id == taskId
    })}/>
    </div>
  )
}

export default Task