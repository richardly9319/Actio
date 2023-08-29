import ReactModal from 'react-modal';
import { useState } from 'react';

import Modal from './Modal';

function Item( {itemName} ) {

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
        <Modal itemName={itemName} /> </ReactModal>
    <li className="inline-block" onClick={openModal} >{itemName}</li>
    <ul className="list-disc ml-8">
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
    </ul>
    </div>
  )
}

export default Item