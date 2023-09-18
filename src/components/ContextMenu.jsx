import React, { useEffect, useRef } from 'react';

const ContextMenu = ({ setContextMenuIsVisible, items, onClose, onClick }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        event.stopPropagation();
        onClose();
        setContextMenuIsVisible(false);
      }
    };

    // Attach the click event listener
    document.addEventListener('touchstart', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onClose]);

  const handleItemClick = (action) => {
    onClick(action);
    onClose();
  };

  return (
    <ul ref={menuRef} className="context-menu absolute bg-white border rounded shadow-md w-40 z-10">
      {items.map((item, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-gray-100"
          onClick={() => handleItemClick(item.action)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
