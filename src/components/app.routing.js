import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import { Login } from './Auth/Login/Login.component';
import { Register } from './Auth/Register/Register.component';
import { Header } from './Common/Header/Header.component';
import { Sidebar } from './Common/Sidebar/Sidebar.component';
import AddItem from './Items/AddItem/AddItem.component';
import { ViewItems } from './Items/ViewItems/ViewItems.component';
import { EditItem } from './Items/EditItem/EditItem.component';
import { SearchItems } from './Items/SearchItems/SearchItems.component';
import MessageComponent from './Users/Messages/Messages.component';
import { ItemDetailsLanding } from './Items/ItemDetails/ItemDetailsLanding';
import { ForgotPassword } from './Auth/ForgotPassword/ForgotPassword.component';
import { ResetPassword } from './Auth/ResetPassword/ResetPassword.component';

const Home = (props) => {

  return (<p>Home Page</p>)
}

const Contact = (props) => {
  return (<p>Contact Page</p>)
}

const Settings = (props) => {
  return (<p>Settings Page</p>)
}

const About = (props) => {
  return (<p>About Page</p>)
}
const Dashboard = (props) => {
  return (
    <div>
      <h2>Welcome to group38 web store</h2>
      <p>Please use sidenavigation menu or contact system administrator for support</p>
    </div>
  )
}

const PageNotFound = (props) => {
  return (
    <div>
      <p>PageNotFound Page</p>
      <img src="./images/notfound.png" alt="notfound.png" width="600px"></img>
    </div>
  )
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(routeProps) => {
      if (localStorage.getItem('token')) {
        return (
          <div>
            <Header isLoggedIn={true}></Header>
            <Sidebar isLoggedIn={true}></Sidebar>
            <div className="main_content">
              <Component {...routeProps}></Component>
            </div>
          </div>
        )
      } else {
        return <Redirect to="/"></Redirect>
      }
    }} ></Route >
  )
}

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(routeProps) => {
      return (
        <div>
          <Header isLoggedIn={localStorage.getItem('token') ? true : false}></Header>
          <Sidebar isLoggedIn={localStorage.getItem('token') ? true : false}></Sidebar>
          <div className="main_content">
            <Component {...routeProps}></Component>
          </div>
        </div>
      )
    }} ></Route >
  )
}

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={Login}></PublicRoute>
        <PublicRoute exact path="/register" component={Register}></PublicRoute>
        <PublicRoute path="/about" component={About}></PublicRoute>
        <PublicRoute path="/contact" component={Contact}></PublicRoute>
        <PublicRoute path="/settings" component={Settings}></PublicRoute>
        <ProtectedRoute path="/home" component={Home}></ProtectedRoute>
        <ProtectedRoute path="/dashboard" component={Dashboard}></ProtectedRoute>
        <ProtectedRoute path="/add_item" component={AddItem}></ProtectedRoute>
        <ProtectedRoute path="/view_items" component={ViewItems}></ProtectedRoute>
        <ProtectedRoute path="/edit_item/:id" component={EditItem}></ProtectedRoute>
        <ProtectedRoute path="/messages" component={MessageComponent}></ProtectedRoute>
        <PublicRoute path="/search_item" component={SearchItems} />
        <PublicRoute path="/item_details/:id" component={ItemDetailsLanding} />
        <PublicRoute path="/forgot_password" component={ForgotPassword} />
        <PublicRoute path="/reset_password/:token" component={ResetPassword} />
        <PublicRoute component={PageNotFound}></PublicRoute>
      </Switch>
    </BrowserRouter>
  )
}

// props supplied by route 
// history ==> contains functions to be called to navigate from controller
// match => to get dynamic value from url
// location ==> optional url data and data changed when navigating



// revision
// react-router-dom
// BrowserRouter ==> wrapper it provides context
// Route==> configuration block
// // props supplied by route 
// history ==> contains functions to be called to navigate from controller
// match => to get dynamic value from url
// location ==> optional url data and data changed when navigating

// Link,NavLink ==> for navigation on click event
// Switch ==> prevents single route render
// 