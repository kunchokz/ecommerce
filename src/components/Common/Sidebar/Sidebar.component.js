import React from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.component.css';

export const Sidebar = (props) => {
  let sidebarContent = props.isLoggedIn
    ? <div className="sidebar">
      <Link to="/add_item">Add Item</Link>
      <Link to="/view_items">View Items</Link>
      <Link to="/search_item">Search Item</Link>
      <Link to="/messages">Messages</Link>
      <Link to="/notifications">Notifications</Link>
    </div>
    : null;

  return sidebarContent;
}