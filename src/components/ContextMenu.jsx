import React, { useEffect, useRef } from 'react';

const ContextMenu = ({ setContextMenuIsVisible, items, onClose, onClick }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
        setContextMenuIsVisible(false);
      }
    };

    // Attach the event listeners
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('mousedown', handleClickOutside, { passive: true });

    // Clean up the event listeners on component unmount
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleItemClick = (e, action) => {
    e.stopPropagation(); // To ensure the click doesn't propagate up and trigger handleClickOutside
    onClick(action);
    onClose();
  };

  return (
    <ul ref={menuRef} className="context-menu absolute bg-white border rounded shadow-md w-40 z-10">
      {items.map((item, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-gray-100"
          onClick={(e) => handleItemClick(e, item.action)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
