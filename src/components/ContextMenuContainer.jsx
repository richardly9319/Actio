// ContextMenuContainer.js
import React, { useState } from 'react';
import ContextMenu from './ContextMenu';
import axios from 'axios';

const ContextMenuContainer = ({ groupID, children, items, showInputField, showGroupInputField, handleTaskGroupDelete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [menuItems, setMenuItems] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
    const user_id = 2;

  const handleContextMenu = (e, items) => {
    e.preventDefault();
    setMenuItems(items);
    setPosition({ top: e.clientY, left: e.clientX });
    setIsVisible(true);

  };

  const handleCloseMenu = () => {
    setIsVisible(false);
    setClickedItemId(null);
  };

  const handleMenuItemClick = (action) => {
    console.log(`Clicked on: ${action}`);
    if (action === 'add_task') {
        showInputField('Task');
      } else if (action === 'add_group') {
        showInputField('Group');
      } else if (action === 'delete_group') {
        handleTaskGroupDelete(groupID);
      } else if (action === 'new_task') {
        showGroupInputField('New Task');
      }
  };

  return (
    <div className="relative inline-block" onContextMenu={(e) => handleContextMenu(e, menuItems)}>
      {children}
      {isVisible && (
        <ContextMenu items={items} onClose={handleCloseMenu} onClick={handleMenuItemClick} />
      )}
    </div>
  );
};

export default ContextMenuContainer;
