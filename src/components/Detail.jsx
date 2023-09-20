import ReactModal from 'react-modal';
import { useState } from 'react';
import ContextMenuContainer from "./ContextMenuContainer";



function Detail( {setContextMenuIsVisible, detailId, itemId, handleDetailDelete, userID, detailText} ) {


  const contextMenuItems = [
    { label: "Delete Note", action: "delete_note" },
];

 
  return (
    <div>
      <ContextMenuContainer detailId={detailId} handleDetailDelete={handleDetailDelete} setContextMenuIsVisible={setContextMenuIsVisible} userID={userID} itemId={itemId} items={contextMenuItems}>
    <li className="inline-block ml-1 md:text-sm" >• {detailText}</li>
    </ContextMenuContainer>
    </div>
  )
}

export default Detail