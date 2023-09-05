import React from 'react';

const ContextMenu = ({ items, onClose, onClick }) => {
  const handleItemClick = (action) => {
    onClick(action);
    onClose();
  };

  
  


  return (
    <ul className="context-menu absolute bg-white border rounded shadow-md w-40 z-10">
      {items.map((item, index) => (
        <li
          key={index}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => handleItemClick(item.action)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
