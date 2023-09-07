import { useState } from 'react';

import DetailList from './DetailList';
import { motion, AnimatePresence } from "framer-motion"
import ContextMenuContainer from "./ContextMenuContainer"
import { useRef } from 'react';
import axios from 'axios';

function Item( {handleItemDelete, setUserData, sectionType, itemId, itemName, itemDetails} ) {

  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = 2;

  const inputRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  let contextMenuItems;

  if ((sectionType == "goals") || (sectionType == "challenges")) {
  contextMenuItems = [
    { label: "Add new note", action: "Add_item_note" },
    { label: "Delete Item", action: "delete_item" },
  ];} else {
    contextMenuItems = [
      { label: "Delete Item", action: "delete_item" },
    ];
  }

  const [inputPopup, setInputPopup] = useState({ isVisible: false, label: '' });

    const showInputField = (label) => {
      setInputPopup({ isVisible: true, label });
    };

  

  return (
    <div>
    <ContextMenuContainer itemId={itemId} handleItemDelete={handleItemDelete} showInputField={showInputField} items={contextMenuItems}>
    <motion.li
    initial={{ color: "rgb(55, 65, 81, 1)" }}
    whileHover={{ color: "rgb(110, 113, 125)" }}
    transition={{ duration: 0.2 }}
    className="font-semibold flex text-gray-700 leading-relaxed" onContextMenu={(e) => {
        e.preventDefault();
      }} onClick={() => {setIsOpen(!isOpen)}}>
       {itemName} 
      </motion.li>
      </ContextMenuContainer>

      {inputPopup.isVisible && (
                <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                >
              <input
                ref={inputRef}
                type="text"
                placeholder={`Enter ${inputPopup.label} Name`}
              />
              <button onClick={() => {
                const value = inputRef.current.value;

                if (inputPopup.label == "Note") {
                  
                axios.post(`${apiUrl}/${user_id}/${sectionType}/${itemId}`, {"detail_text": value})
                .then((response) => {
                  const itemTypeDetails = sectionType.slice(0, -1) + "details";
                  setUserData(prevData => ({
                    ...prevData,
                    [itemTypeDetails]: [...prevData[itemTypeDetails], response.data.newDetail]
                  }));
                })
                .catch((err) => {
                  console.log(err);
                })
              }
              
              setInputPopup({ isVisible: false, label: '' });
            }}>
              Submit
            </button>
            </motion.div>
        )}

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