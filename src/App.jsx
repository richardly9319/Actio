import Section from "./components/Section/Section"
import axios from 'axios';
import { useEffect, useState } from "react";
import TaskSection from "./components/TaskSection";
import ContextMenu from "./components/ContextMenu";
import menuIcon from "./assets/menuIcon.svg"
import SideBar from "./components/SideBar";
import { motion } from "framer-motion";
import notificationSoundSrc from "./assets/sound2.mp3"
import "./App.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() { 
  const apiUrl = import.meta.env.VITE_API_URL;

  const notificationSound = new Audio(notificationSoundSrc);
  notificationSound.volume = 0.35;

  const taskCompleteNotify = () => {
    notificationSound.play();
    toast.success("Task Complete!");
  }

  const [userData, setUserData] = useState({});  // Changed to an object
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userID, setUserID] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchData = (id) => {
    axios.get(`${apiUrl}/${id}`)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');

    if (!storedUserID) {
        const userInputID = prompt("Please enter your unique user ID:");
        if (userInputID && userInputID.trim().length > 0) {
            localStorage.setItem('userID', userInputID);
            setUserID(userInputID); // Set userID state
        } else {
            console.error('Valid User ID is required.');
        }
    } else {
        setUserID(storedUserID); // Set userID state
    }
}, []);

useEffect(() => {
    if (userID) {
        fetchData(userID); // Fetch data whenever userID changes
    }
}, [userID]);


  return (
    <div className="select-none md:pt-8 flex flex-col md:flex-row min-h-screen w-screen" onContextMenu={(e) => {
      e.preventDefault();
    }}>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <motion.img id="SideBar" 
        initial={{ scale: 1 }} 
        whileHover={{ scale: 1.1 }}
        className="fixed right-5 top-5 w-7" src={menuIcon} alt="side menu" onClick={toggleSidebar}
      />

      { sidebarOpen && (
        <SideBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}/>
      )}

      <div className="w-full md:w-1/2 md:ml-24">
        {userID && <TaskSection userID={userID} taskCompleteNotify={taskCompleteNotify} sectionTitle="Action Items" />}
      </div>

      <div className="w-full md:w-1/2 mb-8 md:ml-2 mr-8 pl-3 pt-2 pb-2">
        <Section userID={userID} setUserData={setUserData} sectionTitle="Goals & Objectives" sectionType="goals" sectionItems={userData.goals} sectionDetails={userData.goaldetails} />
        
        <Section userID={userID} setUserData={setUserData} sectionTitle="Challenges & Obstacles" sectionType="challenges" sectionItems={userData.challenges} sectionDetails={userData.challengedetails} />
        {/* <Section sectionTitle="Solutions" /> */}
        {/* <Section userID={userID} setUserData={setUserData} sectionTitle="Inspiration" sectionType="inspiration" sectionItems={userData.inspiration} sectionDetails={userData.inspirationdetails} /> */}
        {/* <Section userID={userID} setUserData={setUserData} sectionTitle="Insights & Ideas" sectionType="insightsIdeas" sectionItems={userData.insightsIdeas} sectionDetails={userData.insightIdeasdetails}/> */}
      </div>
      
    </div>
  )
}
