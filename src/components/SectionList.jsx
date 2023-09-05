import Item from "./Item";

function SectionList( {sectionItems, sectionDetails} ) {
  return (
    <ul className="ml-4">
        
        {sectionItems.map((item, index) => {
            return <Item itemId={item.id} itemName={item.task_name} key={index} taskdetails={taskdetails}/>
        })}
    </ul>
  )
}

export default SectionList