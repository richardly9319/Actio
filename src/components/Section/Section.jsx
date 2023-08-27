import { useState, useEffect } from "react";
import Item from "../Item";


function Section( {sectionTitle} ) {

    const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="m-8">
        <h2 className="inline text-quaternary-color" onClick={() => {setIsOpen(!isOpen)}}>{sectionTitle}</h2>
        {(isOpen) ? 
            <ul className="ml-8 mt-4">
            <Item />
            <Item />
            <Item />
            </ul>
            : <></>
        }
        
        </div>
  )
}

export default Section