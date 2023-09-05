import Detail from "./Detail"
import { motion, AnimatePresence } from "framer-motion";

function DetailList( {details} ) {


  return (
    <motion.div
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
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