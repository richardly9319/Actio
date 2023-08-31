import ReactModal from 'react-modal';
import { useState } from 'react';

import Modal from './Modal';
import DetailList from './DetailList';
import RightClickMenu from './RightClickMenu';

import arrowIcon from '../assets/arrowIcon.png';

function Item( {itemId, itemName, itemDetails} ) {

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
        <Modal itemName={itemName} /> </ReactModal>
    <li className="flex" onContextMenu={(e) => {
        e.preventDefault();
        openModal();
      }} onClick={() => {setIsOpen(!isOpen)}}>
       {itemName} 
      </li>
      {(isOpen) ? 
           <DetailList details={itemDetails.filter((detail) => {
            
            return detail.section_id == itemId
           })} />
            : <></>
        }
    
    </div>
  )
}

export default Item