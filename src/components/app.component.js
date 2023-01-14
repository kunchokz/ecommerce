import React from 'react';
import { AppRouting } from './app.routing';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from '../store';

import 'react-image-gallery/styles/css/image-gallery.css'


export const App = (props) => {
  return (
    <div>
      <Provider store={store}>
        <AppRouting></AppRouting>
      </Provider>
      <ToastContainer></ToastContainer>
    </div>
  )
}

// export class App extends React.Component {
//   constructor() {
//     super();
//     // this.props
//     // this.state
//     // this.setState
//   }

//   render() {
//     // render is mandatory function
//     // render function must return html node
//     // UI logic can be kept inside render
//     return (
//       <p>I am class based component</p>
//     )
//   }
// }


// component ===> either class or function
// component is basic building block of react
// component is responsibile to return a single html node
// component will mange the behaviour of node

// component can be either statefull or stateless


// props and state
// props and state both are application data

// props ==> incoming data for an component
// state ===> data within component

// 16.8 > hooks
// statefull and stateless component with functional component
// class still can be used

// < 16.8 
// class based component for statefull
// functional component for stateless
