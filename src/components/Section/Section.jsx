import { useState, useEffect } from "react";
import ItemList from "../ItemList";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from 'react';
import axios from "axios";
import addItem from '../../assets/ui_tap-variant-02.mp3';

import ContextMenuContainer from "../ContextMenuContainer";

function Section( {setContextMenuIsVisible, userID, userData, setUserData, sectionTitle, sectionItems, sectionDetails, sectionType} ) {

    const [isOpen, setIsOpen] = useState(false);

    const addItemSound = new Audio(addItem);
    addItemSound.volume = 0.20;
  


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
      addItemSound.play()
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

    const handleDetailDelete = (itemId, detailId) => {
      console.log("itemId:", itemId);
      console.log("detailId:", detailId);
  
      axios
          .delete(`${apiUrl}/${user_id}/${sectionType}/${itemId}/${detailId}`)
          .then((response) => {
            
              setUserData(prevData => {
                  // Determine the section name for details (e.g., goalDetails if sectionType is goals)
                  const sectionDetailName = `${sectionType.slice(0, -1)}details`;
                  console.log("sectionDetailName", sectionDetailName)
                  // Filter out the deleted detail
                  const updatedDetails = prevData[sectionDetailName]?.filter(detail => detail.id !== detailId);
  
                  // Return the updated state
                  return {
                      ...prevData,
                      [sectionDetailName]: updatedDetails
                  };
              });
  
              setContextMenuIsVisible(false);
          })
          .catch((error) => {
              console.error("Error deleting detail:", error);
          });
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
    <div className="pt-4 px-0 mr-4 ml-2 pb-4 md:pl-0 border-t-2 border-primary-navy/8 border-groove md:border-0">
        <ContextMenuContainer setContextMenuIsVisible={setContextMenuIsVisible} userID={userID} items={contextMenuItems} showInputField={showInputField}>
        <h2 
        className="mb-1 md:cursor-pointer text-2xl md:text-lg font-semibold text-black" 
        onClick={() => {setIsOpen(!isOpen)}}
        >{sectionTitle}
        {!isOpen && ":"}
        </h2>
        </ContextMenuContainer>

        <AnimatePresence>
        {(isOpen) ? 
            <motion.div
            initial={{ opacity: 0, y: 0, scaleY: 0.5 }}    
            animate={{ opacity: 1, y: 0, scaleY: 1 }}     // Falls down to its position while opening up
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: 'top' }} 
            >
            <ItemList handleDetailDelete={handleDetailDelete} setContextMenuIsVisible={setContextMenuIsVisible} userData={userData} handleSubmit={handleSubmit} setInputPopup={setInputPopup} inputRef={inputRef} inputPopup={inputPopup} userID={userID} handleItemDelete={handleItemDelete} setUserData={setUserData} sectionType={sectionType} sectionItems={sectionItems} sectionDetails={sectionDetails} />
            </motion.div>
            : null
        }
        </AnimatePresence>
        
        </div>
  )
}

export default Section