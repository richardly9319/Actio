import { useState, useEffect } from "react";
import ItemList from "../ItemList";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from 'react';
import axios from "axios";

import ContextMenuContainer from "../ContextMenuContainer";

function Section( {userData, setUserData, sectionTitle, sectionItems, sectionDetails, sectionType} ) {

    const [isOpen, setIsOpen] = useState(false);

    const [inputPopup, setInputPopup] = useState({ isVisible: false, label: '' });

    const showInputField = (label) => {
      setInputPopup({ isVisible: true, label });
    };

    const contextMenuItems = [
      { label: "Add New", action: "Add_section" },
    ];

    const inputRef = useRef();

    const apiUrl = import.meta.env.VITE_API_URL;
    const user_id = 2;

    const handleItemDelete = (itemId) => {
      axios
        .delete(`${apiUrl}/${user_id}/${sectionType}/${itemId}`)
        .then((response) => {
          console.log("response: ", response);
          setUserData(prevData => ({
            ...prevData,
            [sectionType]: [...prevData[sectionType].filter(item => item.id !== itemId)]
          }));
        })
        
        .catch((error) => {
          console.error("Error deleting Item:", error);
        });
    };

    

  return (
    <div className="mt-2">
        <ContextMenuContainer items={contextMenuItems} showInputField={showInputField}>
        <motion.h2 
        className="text-lg font-semibold text-green-800" 
        onClick={() => {setIsOpen(!isOpen)}}
        initial={{ scale: 1 }} 
        whileHover={{ scale: 1.02 }}
        >{sectionTitle}</motion.h2>
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

                
                if (inputPopup.label == "Item") {
                axios.post(`${apiUrl}/${user_id}/${sectionType}`, {[sectionType]: {"item_name": value, "user_id": user_id}})
                .then((response) => {
                  setUserData(prevData => ({
                    ...prevData,
                    [sectionType]: [...prevData[sectionType], response.data.newItem[sectionType]]
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

        <AnimatePresence>
        {(isOpen) ? 
            <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            >
            <ItemList handleItemDelete={handleItemDelete} setUserData={setUserData} sectionType={sectionType} sectionItems={sectionItems} sectionDetails={sectionDetails} />
            </motion.div>
            : null
        }
        </AnimatePresence>
        
        </div>
  )
}

export default Section