import Detail from "./Detail"
import { motion, AnimatePresence } from "framer-motion";

function DetailList( {details} ) {


  return (
    <motion.div
    initial={{ opacity: 0, y: 0, scaleY: 0.5 }}    // Starts above with scaled down completely on the Y-axis
    animate={{ opacity: 1, y: 0, scaleY: 1 }}     // Falls down to its position while opening up
    transition={{ duration: 0.2 }}
    style={{ transformOrigin: 'top' }} 
    >
    <ul className="ml-4 list-disc list-inside">
        {details?.map((detail, index) => {
            return <Detail detailText={detail.detail_text} key={index}/>
        })}
    </ul>
    </motion.div>
  )
}

export default DetailList