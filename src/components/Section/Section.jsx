import { useState, useEffect } from "react";
import ItemList from "../ItemList";
import { motion, AnimatePresence } from "framer-motion";

import ContextMenuContainer from "../ContextMenuContainer";

function Section( {sectionTitle, sectionItems, sectionDetails} ) {

    const [isOpen, setIsOpen] = useState(true);

    const [inputPopup, setInputPopup] = useState({ isVisible: false, label: '' });

    const showInputField = (label) => {
      setInputPopup({ isVisible: true, label });
    };

    const contextMenuItems = [
      { label: "Add New", action: "Add_section" },
    ];

    

  return (
    <div className="">
        <ContextMenuContainer items={contextMenuItems} showInputField={showInputField}>
        <motion.h2 
        className="text-lg font-semibold text-green-800" 
        onClick={() => {setIsOpen(!isOpen)}}
        initial={{ scale: 1 }} 
        whileHover={{ scale: 1.02 }}
        >{sectionTitle}</motion.h2>
        </ContextMenuContainer>
        
        <AnimatePresence>
        {(isOpen) ? 
            <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            >
            <ItemList sectionItems={sectionItems} sectionDetails={sectionDetails} />
            </motion.div>
            : null
        }
        </AnimatePresence>
        
        </div>
  )
}

export default Section