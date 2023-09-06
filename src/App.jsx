import Section from "./components/Section/Section"
import axios from 'axios';
import { useEffect, useState } from "react";
import TaskSection from "./components/TaskSection";
import ContextMenu from "./components/ContextMenu";
import book from "./assets/book7.jpg"
import menuIcon from "./assets/menuIcon.svg"

export default function App() { 

  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = 2


  const [userData, setUserData] = useState([]);


  useEffect(() => {
    axios.get(`${apiUrl}/${user_id}`)
    .then((response) => {
      console.log(response.data);
      setUserData(response.data);

    }).catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, [])
  

  return (
    <div className="pt-8 w-full flex min-h-screen" onContextMenu={(e) => {
      e.preventDefault();
    }}>

    <img className="absolute left-4 top-4 w-6" src={menuIcon} alt="menu" />

    <div className="ml-24 w-1/2">
    <TaskSection sectionTitle="Action Items" />
    </div>

    <div className="w-1/2 mb-8 ml-2 mr-8 pl-3 pt-2 pb-2">
    <Section sectionTitle="Goals & Objectives" sectionItems={userData.goals} sectionDetails={userData.goaldetails} />
    <Section sectionTitle="Challenges" sectionItems={userData.challenges} sectionDetails={userData.challengedetails} />
    <Section sectionTitle="Inspiration" sectionItems={userData.inspiration} sectionDetails={userData.inspirationdetails} />
    <Section sectionTitle="Insights & Ideas" sectionItems={userData.insightsIdeas} sectionDetails={userData.insightIdeasdetails}/>
    
    
    </div>
    <img className="opacity-80 absolute bottom-5 left-1/2 translate-x-[-50%] -z-1 w-36" src={book} alt="book" />
    <button className="absolute bottom-4 right-4 font-semibold text-gray-700 hover:font-bold">Logout</button>
    </div>
)
}