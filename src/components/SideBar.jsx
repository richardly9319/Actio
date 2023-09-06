import React from 'react'
import menuIcon from '../assets/menuIcon.svg'
import { motion, AnimatePresence } from "framer-motion"

function SideBar( {toggleSidebar, sidebarOpen} ) {
  return (
    <motion.div className="fixed top-0 right-0 h-screen w-64 bg-gray-100 z-50 p-2"
    style={{ background: "linear-gradient(to right, rgba(250, 250, 250, 1) 0%, rgba(255,255,255, 1) 100%)" }}
    initial={{ x: "8rem" }}  
    animate={{ x: 0 }}  
    exit={{ x: "8rem" }}
    transition={{ type: "tween", duration: 0.15 }}
      >
          <button className= "block p-2 rounded cursor-pointer hover:bg-white">Dark Theme</button>
          <button className= "block p-2 rounded cursor-pointer hover:bg-white">Settings</button>
          <button className= "block p-2 rounded cursor-pointer hover:bg-white">Download App</button>
          <button className= "block p-2 rounded cursor-pointer hover:bg-white">Upgrade to Pro</button>
          <button className= "block p-2 rounded cursor-pointer hover:bg-white">Logout</button>
          <img src={menuIcon} alt="Side Menu" className="absolute right-4 top-4 w-6" onClick={toggleSidebar}/>
        </motion.div>
  )
}

export default SideBar