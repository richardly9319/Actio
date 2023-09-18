import React, { useState, useRef } from 'react';
import ContextMenu from './ContextMenu';
import axios from 'axios';

const ContextMenuContainer = ({ setContextMenuIsVisible, userID, itemId, handleItemDelete, groupID, children, items, showInputField, showGroupInputField, handleTaskGroupDelete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [menuItems, setMenuItems] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = userID;
  const longPressTimer = useRef(null); // Using a ref to manage the timer

  const handleContextMenu = (e, items) => {
    e.preventDefault();
    setMenuItems(items);
    setPosition({ top: e.clientY, left: e.clientX });
    setIsVisible(true);
    setContextMenuIsVisible(true); 
  };

  const handleCloseMenu = () => {
    setIsVisible(false);
    setClickedItemId(null);
  };

  const handleMenuItemClick = (action) => {
    if (action === 'add_task') {
        showInputField('Item');
      } else if (action === 'add_group') {
        showInputField('Group');
      } else if (action === 'delete_group') {
        handleTaskGroupDelete(groupID);
      } else if (action === 'new_task') {
        showGroupInputField('Item', groupID);
      } else if (action === "Add_section") {
        showInputField('Item');
      } else if (action ==="Add_item_note") {
        showInputField('Note');
      } else if (action === "delete_item") {
        handleItemDelete(itemId);
      }
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    longPressTimer.current = setTimeout(() => {
      handleContextMenu(e, menuItems);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return (
    <div 
      className="relative inline-block" 
      onContextMenu={(e) => handleContextMenu(e, menuItems)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      {isVisible && (
        <ContextMenu setContextMenuIsVisible={setContextMenuIsVisible} items={items} onClose={handleCloseMenu} onClick={handleMenuItemClick} />
      )}
    </div>
  );
};

export default ContextMenuContainer;
