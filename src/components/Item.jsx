import { useState, useRef, useEffect } from 'react';
import DetailList from './DetailList';
import { motion, AnimatePresence } from "framer-motion"
import ContextMenuContainer from "./ContextMenuContainer";
import axios from 'axios';

function Item({ userID, handleItemDelete, setUserData, sectionType, itemId, itemName, itemDetails }) {
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
            <ContextMenuContainer userID={userID} itemId={itemId} handleItemDelete={handleItemDelete} showInputField={showInputField} items={contextMenuItems}>
                <motion.li
                    initial={{ color: "rgb(55, 65, 81, 1)" }}
                    whileHover={{ color: "rgb(110, 113, 125)" }}
                    transition={{ duration: 0.2 }}
                    className="cursor-pointer font-medium flex text-gray-700 text-lg md:text-base md:leading-relaxed mt-1 md:mt-0"
                    onClick={() => { setIsOpen(!isOpen) }}>
                    {itemName}
                </motion.li>
            </ContextMenuContainer>

            {inputPopup.isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={`Enter ${inputPopup.label} Name`}
                    />
                    <button onClick={() => {
                        const value = inputRef.current.value;
                        console.log("submitted?");

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
                    }}>
                        Submit
                    </button>
                </motion.div>
            )}

            {/* <AnimatePresence> */}
                {isOpen &&
                    // <div
                        // initial={{ opacity: 0 }}
                        // animate={{ opacity: 1 }}
                        // // exit={{ opacity: 0 }}
                        // transition={{ duration: 0.5 }}
                        // >
                        <DetailList details={itemDetails?.filter(detail => detail.section_id === itemId)} />
                    // </div>
                }
            {/* </AnimatePresence> */}
        </div>
    )
}

export default Item;
