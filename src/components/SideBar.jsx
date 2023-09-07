import React from 'react'
import menuIcon from '../assets/menuIcon.svg'
import { motion, AnimatePresence } from "framer-motion"

function SideBar({ toggleSidebar, sidebarOpen }) {
    return (
        <motion.div
            className="fixed top-0 right-0 h-screen w-full md:w-64 bg-gray-100 z-50 p-2"
            style={{ background: "linear-gradient(to right, rgba(245, 245, 250, 1) 0%, rgba(255,255,255, 1) 100%)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.15 }}
        >
            <button className="block p-2 rounded cursor-pointer hover:bg-blue-100">Dark Theme</button>
            <button className="block p-2 rounded cursor-pointer hover:bg-blue-100">Settings</button>
            <button className="block p-2 rounded cursor-pointer hover:bg-blue-100">Download App</button>
            <button className="block p-2 rounded cursor-pointer hover:bg-blue-100">Upgrade to Pro</button>
            <button onClick={() => {localStorage.removeItem('userID');
          toggleSidebar();
          }} className="block p-2 rounded cursor-pointer hover:bg-blue-100">Logout</button>
            <img src={menuIcon} alt="Side Menu" className="absolute right-4 top-4 w-6" onClick={toggleSidebar} />
        </motion.div>
    )
}

export default SideBar
