import Section from "./components/Section/Section";
import axios from 'axios';
import { useEffect, useState } from "react";
import TaskSection from "./components/TaskSection";
import ContextMenu from "./components/ContextMenu";
import menuIcon from "./assets/menuIcon.svg"
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";
import notificationSoundSrc from "./assets/sound2.mp3"

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

export default function App() { 
  const apiUrl = import.meta.env.VITE_API_URL;

  const notificationSound = new Audio(notificationSoundSrc);
  notificationSound.volume = 0.35;

  const taskCompleteNotify = () => {
    notificationSound.play();
    toast.success("Complete!");
  }

  const [userID, setUserID] = useState(2);
  const [userData, setUserData] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [googleUserId, setGoogleUserId] = useState(null); // This will store the user's Google ID
  const [contextMenuIsVisible, setContextMenuIsVisible] = useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchData = () => {
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    
    axios.get(`${apiUrl}/${userID}`, { headers })
    .then((response) => {
      console.log(response.data);
      setUserData(response.data);
    }).catch(error => {
      console.error('Error fetching user data:', error);
    });
};


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const responseGoogle = async (response) => {
    console.log("response: ", response)

    if (response?.credential) {
        try {
            const serverResponse = await axios.post(`${apiUrl}/auth/google`, {
                token: response.credential
            });
            

            if (serverResponse.data && serverResponse.data.user) {
              setUserData(serverResponse.data.user);
              setToken(serverResponse.data.token); // Assuming this is where the token is
              setGoogleUserId(serverResponse.data.user.googleUserId); // Assuming this is where the Google user ID is
              setUserID(serverResponse.data.user.id); // Set the user's ID from the database
              setIsLoggedIn(true);
              localStorage.setItem('userToken', serverResponse.data.token);
              localStorage.setItem('userID', serverResponse.data.user.id);
              toast.success("Logged in successfully!");
          } else {
              toast.error("Error logging in. Please try again.");
          }
        } catch (error) {
            toast.error("Error connecting to server. Please try again.");
        }
    } else {
        toast.error("Google authentication failed. Please try again.");
    }
};

const logout = () => {
  // Remove token from state and local storage
  setToken(null);
  setIsLoggedIn(false);
  localStorage.removeItem('userToken');
  localStorage.removeItem('userID');
  setUserID("2");
  setSidebarOpen(false);
  // Add any additional logout logic here...
};

const handleAppClick = (e) => {
  if (contextMenuIsVisible && !e.target.closest('.context-menu')) {
    setContextMenuIsVisible(false)
  }
};


  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    const storedUserID = localStorage.getItem('userID');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
    if (storedUserID) {
      setUserID(storedUserID); // Set the user's ID
    }
  }, []);

  useEffect(() => {
    if (userID) {
      fetchData();
    }
  }, [userID, token]);

  return (
    <GoogleOAuthProvider clientId="307941107777-dch3oqprahp6b0l8ea21aiquilkq7suo.apps.googleusercontent.com">
      <div className="select-none md:pt-8 flex flex-col md:flex-row min-h-screen w-screen" 
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onClick={handleAppClick}
      >
        <ToastContainer
          position="top-center"
          autoClose={450}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="light"
          transition={Slide}
        />

        <motion.img id="SideBar" 
          initial={{ scale: 1 }} 
          whileHover={{ scale: 1.1 }}
          className="fixed right-5 top-5 w-7" src={menuIcon} alt="side menu" onClick={toggleSidebar}
        />
        {sidebarOpen && (
          <SideBar logout={logout} isLoggedIn={isLoggedIn} responseGoogle={responseGoogle} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
        )}

          {contextMenuIsVisible && <div className="masking-layer" 
          onClick={(e) => {
            setContextMenuIsVisible(false);
            e.stopPropagation();
            
            }
            
            }
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
           }}
            
            ></div>}

        <div className="w-full md:w-1/2 md:ml-24">
          {userID && <TaskSection setContextMenuIsVisible={setContextMenuIsVisible} userID={userID} taskCompleteNotify={taskCompleteNotify} sectionTitle="Action Items" />}
        </div>
        <div className="w-full md:w-1/2 mb-8 md:ml-2 mr-8 pl-3 pt-2 pb-2">
          <Section setContextMenuIsVisible={setContextMenuIsVisible} userData={userData} userID={userID} setUserData={setUserData} sectionTitle="Goals & Objectives" sectionType="goals" sectionItems={userData.goals} sectionDetails={userData.goaldetails} />
          <Section setContextMenuIsVisible={setContextMenuIsVisible} userData={userData} userID={userID} setUserData={setUserData} sectionTitle="Challenges & Obstacles" sectionType="challenges" sectionItems={userData.challenges} sectionDetails={userData.challengedetails} />
        </div>
        

             
      </div>
    </GoogleOAuthProvider>
  )
}
