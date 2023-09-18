import { useState, useEffect } from "react";
import ItemList from "../ItemList";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from 'react';
import axios from "axios";

import ContextMenuContainer from "../ContextMenuContainer";

function Section( {setContextMenuIsVisible, userID, userData, setUserData, sectionTitle, sectionItems, sectionDetails, sectionType} ) {

    const [isOpen, setIsOpen] = useState(false);


    const [inputPopup, setInputPopup] = useState({ isVisible: false, label: '' });

    const showInputField = (label) => {
      setInputPopup({ isVisible: true, label });
      setIsOpen(true);
    };

    const contextMenuItems = [
      { label: "Add New", action: "Add_section" },
    ];

    const inputRef = useRef();

    const apiUrl = import.meta.env.VITE_API_URL;
    const user_id = userID;

    const handleSubmit = () => {
      const value = inputRef.current.value;

                
                if (inputPopup.label == "Item") {
                axios.post(`${apiUrl}/${user_id}/${sectionType}`, {[sectionType]: {"item_name": value, "user_id": user_id}})
                .then((response) => {
                  console.log("API Response: ", response);
                  const newItem = {
                    ...response.data.newItem[sectionType],
                    id: response.data.newItem.id
                  };
                  console.log("newItem:", newItem);
                  setUserData(prevData => ({
                    ...prevData,
                    [sectionType]: [...prevData[sectionType], newItem]
                  }));
                })
                .catch((err) => {
                  console.log(err);
                });
              }
            
              setContextMenuIsVisible(false)
            }
    

    const handleItemDelete = (itemId) => {
      console.log("sectionType: ", sectionType)
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

        setContextMenuIsVisible(false)
    };

    useEffect(() => {
      function handleClickOutside(event) {
        // Check if the user clicked outside of the input
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
    <div className="pt-4 px-2 mr-4 ml-2 pb-4 md:pl-0 border-t-2 border-primary-navy/8 border-groove md:border-0">
        <ContextMenuContainer setContextMenuIsVisible={setContextMenuIsVisible} userID={userID} items={contextMenuItems} showInputField={showInputField}>
        <h2 
        className="md:cursor-pointer text-2xl md:text-lg font-semibold text-black" 
        onClick={() => {setIsOpen(!isOpen)}}
        >{sectionTitle}</h2>
        </ContextMenuContainer>

        <AnimatePresence>
        {(isOpen) ? 
            <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.25 }}   // Starts above with scaled down completely on the Y-axis
            animate={{ opacity: 1, y: 0, scaleY: 1 }}     // Falls down to its position while opening up
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: 'top' }} 
            >
            <ItemList setContextMenuIsVisible={setContextMenuIsVisible} userData={userData} handleSubmit={handleSubmit} setInputPopup={setInputPopup} inputRef={inputRef} inputPopup={inputPopup} userID={userID} handleItemDelete={handleItemDelete} setUserData={setUserData} sectionType={sectionType} sectionItems={sectionItems} sectionDetails={sectionDetails} />
            </motion.div>
            : null
        }
        </AnimatePresence>
        
        </div>
  )
}

export default Section