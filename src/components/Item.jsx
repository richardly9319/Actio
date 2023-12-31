import { useState, useRef, useEffect } from 'react';
import DetailList from './DetailList';
import { motion, AnimatePresence } from "framer-motion"
import ContextMenuContainer from "./ContextMenuContainer";
import axios from 'axios';

function Item({ handleDetailDelete, setContextMenuIsVisible, userData, userID, handleItemDelete, setUserData, sectionType, itemId, itemName, itemDetails }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const user_id = userID;

    const inputRef = useRef();
    const [isOpen, setIsOpen] = useState(false);


    const contextMenuItems = sectionType === "goals" || sectionType === "challenges" ? [
        { label: "Add new note", action: "Add_item_note" },
        { label: "Delete Item", action: "delete_item" },
    ] : [
        { label: "Delete Item", action: "delete_item" },
    ];

    const [inputPopup, setInputPopup] = useState({ isVisible: false, label: '' });

    const showInputField = (label) => {
        setInputPopup({ isVisible: true, label });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {

        
        const value = inputRef.current.value;

                        if (inputPopup.label == "Note") {
                            axios.post(`${apiUrl}/${user_id}/${sectionType}/${itemId}`, { "detail_text": value })
                                .then((response) => {
                                    const itemTypeDetails = sectionType.slice(0, -1) + "details";
                                    
                                    setUserData(prevData => ({
                                        ...prevData,
                                        [itemTypeDetails]: [...prevData[itemTypeDetails], response.data.newDetail]
                                    }));
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }

                        setInputPopup({ isVisible: false, label: '' });
                        setIsOpen(true);
                        setContextMenuIsVisible(false)
      }}

    useEffect(() => {
      function handleClickOutside(event) {
        // Check if the user clicked outside of the input and the button
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          setInputPopup({ isVisible: false, label: '' });
        }
      }
  
      // Add the event listener
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
        <div>
            <ContextMenuContainer setContextMenuIsVisible={setContextMenuIsVisible} userID={userID} itemId={itemId} handleItemDelete={handleItemDelete} showInputField={showInputField} items={contextMenuItems}>
                <motion.li
                    className="leading-tight mb-1 md:mb-0 md:cursor-pointer font-medium flex text-secondary-navy text-lg md:text-base md:leading-relaxed mt-1 md:mt-0"
                    onClick={() => { setIsOpen(!isOpen) }}>
                    {itemName}
                    {((itemDetails.length !== 0) && !isOpen) && ":"}
                </motion.li>
            </ContextMenuContainer>


            

            {/* <AnimatePresence> */}
                {isOpen &&
                    // <div
                        // initial={{ opacity: 0 }}
                        // animate={{ opacity: 1 }}
                        // // exit={{ opacity: 0 }}
                        // transition={{ duration: 0.5 }}
                        // >
                        <DetailList setContextMenuIsVisible={setContextMenuIsVisible} itemId={itemId} handleDetailDelete={handleDetailDelete} userID={userID} details={itemDetails?.filter(detail => detail.section_id === itemId)} />
                    // </div>
                }
            {/* </AnimatePresence> */}

            {inputPopup.isVisible && (
                <motion.div className='ml-4'
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                >
              <input
                ref={inputRef}
                type="text"
                placeholder={`Enter ${inputPopup.label} Name`}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </motion.div>
        )}
        </div>
    )
}

export default Item;
