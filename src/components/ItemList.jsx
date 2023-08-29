import Item from "./Item"

function ItemList( {items} ) {
  return (
    <ul>
        {items.map((item, index) => {
            return <Item itemName={item} key={index}/>
        })}
    </ul>
  )
}

export default ItemList