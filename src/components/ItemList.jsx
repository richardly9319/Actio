import Item from "./Item"

function ItemList( {userID, handleItemDelete, setUserData, sectionType, sectionItems, sectionDetails} ) {


  return (
    <ul className="ml-4">
        {sectionItems?.map((item, index) => {
            return <Item userID={userID} handleItemDelete={handleItemDelete} setUserData={setUserData} sectionType={sectionType} itemId={item.id} itemName={item.item_name} key={index} itemDetails={sectionDetails?.filter((detail, index) => {
              return item.id == sectionDetails[index].section_id
            })} />
        })}
    </ul>
  )
}

export default ItemList