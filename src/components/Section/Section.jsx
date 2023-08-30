import { useState, useEffect } from "react";
import SectionList from "../SectionList";

function Section( {sectionTitle, sectionItems, sectionDetails} ) {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
        <h2 className="inline text-quaternary-color" onClick={() => {setIsOpen(!isOpen)}}>{sectionTitle}</h2>
        {(isOpen) ? 
            <SectionList sectionItems={sectionItems} sectionDetails={sectionDetails} />
            : <></>
        }
        
        </div>
  )
}

export default Section