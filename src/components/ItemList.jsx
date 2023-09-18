import Item from "./Item"
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

function ItemList( {setContextMenuIsVisible, userData, handleSubmit, setInputPopup, inputRef, inputPopup, userID, handleItemDelete, setUserData, sectionType, sectionItems, sectionDetails} ) {

  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = userID;


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
      setInputPopup({ isVisible: false, label: '' })
    }
  }

  return (
    <ul className="ml-3">
        {sectionItems?.map((item, index) => {
            return <Item setContextMenuIsVisible={setContextMenuIsVisible} userData={userData} userID={userID} handleItemDelete={handleItemDelete} setUserData={setUserData} sectionType={sectionType} itemId={item.id} itemName={item.item_name} key={index} itemDetails={sectionDetails?.filter((detail, index) => {
              return item.id == sectionDetails[index].section_id
            })} />
        })}

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
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </motion.div>
        )}
    </ul>
  )
}

export default ItemList;
