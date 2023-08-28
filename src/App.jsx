import Section from "./components/Section/Section"

export default function App() {
  return (
    <div className="grid grid-cols-3 bg-primary-color">
    {/* <h1 className="text-3xl font-bold italic m-8">
      Today
    </h1> */}
    <Section sectionTitle="Goals & Objectives" />
    <Section sectionTitle="Tasks & Todos" />
    <Section sectionTitle="Routines" />
    <Section sectionTitle="Challenges" />
    <Section sectionTitle="Ideas" />
    <Section sectionTitle="Insights" /> 
    <Section sectionTitle="New" />
    <Section sectionTitle="Inspiration" />
    <Section sectionTitle="Habits" />
    <Section sectionTitle="Projects" />
    </div>
  )
}