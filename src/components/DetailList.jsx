import Detail from "./Detail"
import { motion, AnimatePresence } from "framer-motion";

function DetailList( {handleTaskDetailDelete, isTask, setContextMenuIsVisible, itemId, handleDetailDelete, userID, details} ) {


  return (
    <motion.div
    initial={{ opacity: 0, y: 0, scaleY: 0.5 }}    // Starts above with scaled down completely on the Y-axis
    animate={{ opacity: 1, y: 0, scaleY: 1 }}     // Falls down to its position while opening up
    transition={{ duration: 0.2 }}
    style={{ transformOrigin: 'top' }} 
    >
    <ul className="ml-3 leading-relaxed list-disc list-inside">
        {details?.map((detail, index) => {
            return <Detail handleTaskDetailDelete={handleTaskDetailDelete} isTask={isTask} setContextMenuIsVisible={setContextMenuIsVisible} detailId={detail.id} itemId={itemId} handleDetailDelete={handleDetailDelete} userID={userID} detailText={detail.detail_text} key={index}/>
        })}
    </ul>
    </motion.div>
  )
}

export default DetailList