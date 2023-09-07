import ReactModal from 'react-modal';
import { useState } from 'react';

import Modal from './Modal';
import DetailList from './DetailList';
import { motion, AnimatePresence } from "framer-motion"


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
    <motion.li
    initial={{ color: "rgb(55, 65, 81, 1)" }}
    whileHover={{ color: "rgb(110, 113, 125)" }}
    transition={{ duration: 0.2 }}
    className="font-semibold flex text-gray-700 leading-relaxed" onContextMenu={(e) => {
        e.preventDefault();
        // openModal();
      }} onClick={() => {setIsOpen(!isOpen)}}>
       {itemName} 
      </motion.li>
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