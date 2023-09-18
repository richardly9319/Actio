import React, { useEffect, useRef } from 'react';

const ContextMenu = ({ setContextMenuIsVisible, items, onClose, onClick }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    let touchEventFired = false;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        event.stopPropagation();
        onClose();
        setContextMenuIsVisible(false);
      }
    };

    const handleTouchStart = (event) => {
      event.preventDefault();
      touchEventFired = true;
      handleClickOutside(event);
    };

    const handleMouseDown = (event) => {
      if (!touchEventFired) {
        handleClickOutside(event);
      }
      touchEventFired = false;
    };

    // Attach the event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false} );
    document.addEventListener('mousedown', handleMouseDown, { passive: false});

    // Clean up the event listeners on component unmount
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mousedown', handleMouseDown);
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
          onClick={(e) => {
            handleItemClick(item.action);
            e.stopPropagation();
          }}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
