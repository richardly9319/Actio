import Item from "./Item"

function ItemList( {sectionItems, sectionDetails} ) {


  return (
    <ul className="ml-4">
        {sectionItems?.map((item, index) => {
            return <Item itemId={item.id} itemName={item.item_name} key={index} itemDetails={sectionDetails?.filter((detail, index) => {
              return item.id == sectionDetails[index].section_id
            })} />
        })}
    </ul>
  )
}

export default ItemList