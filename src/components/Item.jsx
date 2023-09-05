import ReactModal from 'react-modal';
import { useState } from 'react';

import Modal from './Modal';
import DetailList from './DetailList';


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
    <li className="font-semibold flex text-gray-700" onContextMenu={(e) => {
        e.preventDefault();
        // openModal();
      }} onClick={() => {setIsOpen(!isOpen)}}>
       {itemName} 
      </li>
      {(isOpen) ? 
           <DetailList details={itemDetails?.filter((detail) => {
            
            return detail.section_id == itemId
           })} />
            : <></>
        }
    
    </div>
  )
}

export default Item