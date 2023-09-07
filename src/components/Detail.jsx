import ReactModal from 'react-modal';
import { useState } from 'react';



function Detail( {detailText} ) {


 
  return (
    <div>
    <li className="inline-block ml-1 md:text-sm" >- {detailText}</li>
    </div>
  )
}

export default Detail