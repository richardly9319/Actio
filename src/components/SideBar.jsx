import React from 'react'
import menuIcon from '../assets/menuIcon.svg'
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';

function SideBar({ logout, isLoggedIn, responseGoogle, toggleSidebar, sidebarOpen }) {

    const [showInstallButton, setShowInstallButton] = useState(false);

    let deferredPrompt;

    const sidebarRef = useRef(null);

    const onInstallButtonClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
                setShowInstallButton(false);
            });
        }
    };
    
    

    useEffect(() => {
        function handleOutsideClick(event) {
            // If the sidebar is open and the clicked target is not within the sidebar, close it
            if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar();
                event.stopPropagation();
                event.preventDefault();
            }
        }

        // Attach the click event listener
        document.addEventListener('click', handleOutsideClick, true);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        };
    }, [sidebarOpen, toggleSidebar]);

    useEffect(() => {
    
        const beforeInstallPromptHandler = (event) => {
            event.preventDefault();
            deferredPrompt = event;
            setShowInstallButton(true);
        };
    
        window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    
        return () => {
            window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
        };
    }, []);
    

    return (
        <motion.div
            ref={sidebarRef}
            className="fixed top-0 right-0 h-screen w-3/4 md:w-64 bg-gray-100 z-50 p-2 drop-shadow-lg"
            style={{ background: "linear-gradient(to right, rgba(245, 245, 250, 1) 0%, rgba(255,255,255, 1) 100%)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.15 }}
        >
            <button className="text-xl md:text-base block p-2 rounded md:cursor-pointer hover:text-primary-navy hover:font-semibold active:bg-gray-200">Dark Theme</button>
            <button className="text-xl md:text-base block p-2 rounded md:cursor-pointer hover:text-primary-navy hover:font-semibold active:bg-gray-200">Settings</button>
            <button className="text-xl md:text-base block p-2 rounded md:cursor-pointer hover:text-primary-navy hover:font-semibold active:bg-gray-200">Upgrade to Pro</button>
            <br />
            {
    showInstallButton &&
    <div>
    <button 
        id="btnAdd" 
        className="text-xl md:text-base block p-2 rounded md:cursor-pointer hover:text-primary-navy hover:font-semibold active:bg-gray-200"
        onClick={onInstallButtonClick}>
        Download App
    </button>
    <br />   
    </div>
}

            
            {
                isLoggedIn ? (
                    <button className="text-xl md:text-base block p-2 rounded md:cursor-pointer hover:text-primary-navy hover:font-semibold active:bg-gray-200" onClick={logout}>Logout</button>
                ) : (
                    <GoogleLogin
                    clientId="307941107777-dch3oqprahp6b0l8ea21aiquilkq7suo.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onError={responseGoogle}
                    />
                )
                }
            
            <img src={menuIcon} alt="Side Menu" className="absolute right-4 top-4 w-7" onClick={toggleSidebar} />
        </motion.div>
    )
}

export default SideBar
