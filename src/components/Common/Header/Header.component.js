import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { getCurrentUser } from '../../../utils';
import './Header.component.css'

const logout = (history) => {
  localStorage.clear();
  history.push('/');
  // redirectionService.redirectToLogin()
  // navigation
  // clear local storage
}
const HeaderComponent = (props) => {
  const currentUser = getCurrentUser();
  let navBar = props.isLoggedIn
    ? <ul className="navList">
      <li className="navItem">
        <NavLink activeClassName="selected" to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="navItem">
        <NavLink activeClassName="selected" to="/about">about</NavLink>
      </li>
      <li className="navItem">
        <NavLink activeClassName="selected" to="/contact">Contact</NavLink>

      </li>
      <li className="navItem">
        <NavLink activeClassName="selected" to="/settings">Settings</NavLink>

      </li>
      <li className="navItem logout">
        <span style={{ marginRight: '5px', color: 'white' }}>{currentUser.username}</span>
        <button onClick={() => logout(props.history)} className="btn btn-primary">logout</button>
      </li>
    </ul>
    : <ul className="navList">
      <li className="navItem">
        <NavLink activeClassName="selected" to="/home">Home</NavLink>

      </li>
      <li className="navItem">
        <NavLink activeClassName="selected" to="/">Login</NavLink>

      </li>
      <li className="navItem">
        <NavLink activeClassName="selected" to="/register">Register</NavLink>

      </li>
    </ul>
  return (
    <div className="navBar">
      {navBar}
    </div>
  )
}

export const Header = withRouter(HeaderComponent);