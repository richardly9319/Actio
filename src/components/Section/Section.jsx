import { useState, useEffect } from "react";
import Item from "../Item";
import ItemList from "../ItemList";


function Section( {sectionTitle, items} ) {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
        <h2 className="inline text-quaternary-color" onClick={() => {setIsOpen(!isOpen)}}>{sectionTitle}</h2>
        {(isOpen) ? 
            <ItemList items={['item1', 'item2', 'item3']} />
            : <></>
        }
        
        </div>
  )
}

export default Section