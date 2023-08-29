import Section from "./components/Section/Section"

export default function App() {
  return (
    <div className="pt-8 flex bg-primary-color">
    <div className="ml-8 w-2/5">
    <Section sectionTitle="Today's Action Items" />
    </div>
    <div className="w-2/5 mb-8">
    
    
    <Section sectionTitle="Tasks & Todos" />
    <Section sectionTitle="Projects" />
    <Section sectionTitle="Routines" />
    <Section sectionTitle="Challenges" />
    <Section sectionTitle="Objectives" />
    <Section sectionTitle="Goals" />
    <Section sectionTitle="Insights & Inspiration" />
    <Section sectionTitle="Ideas" />
    <Section sectionTitle="New Items" />
    
    
    
 
    
    
    </div>
    </div>
)
}