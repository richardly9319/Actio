import Section from "./components/Section/Section"
import axios from 'axios';
import { useEffect } from "react";

export default function App() {

  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = 2


  useEffect(() => {
    axios.get(`${apiUrl}/${user_id}`)
    .then((response) => {
      console.log(response.data);
    });
  }, [])
  

  return (
    <div className="pt-8 flex bg-primary-color">
    <div className="ml-8 w-2/5">
    <Section sectionTitle="Tasks" />
    </div>
    <div className="w-2/5 mb-8">
    
    
    <Section sectionTitle="Goals & Objectives" />
    <Section sectionTitle="Challenges" />
    <Section sectionTitle="Inspiration" />
    <Section sectionTitle="Insights & Ideas" />
    
    
    
 
    
    
    </div>
    </div>
)
}