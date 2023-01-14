import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { RootReducer } from './reducers';


const middlewares = [thunk]


const defaultState = {
  item: {
    isLoading: false,
    items: [],
    item: {},
    searchResults: [],
    isSearching: false
  }
}

export const store = createStore(RootReducer, defaultState, applyMiddleware(...middlewares))


// user,items,notifications

// {
//   users:[],
//   userIsLoading:false,
//   user:{},
//   items:[],
//   item:{},
//   isLoadingItem:false,
//   ...
//   ...
// }

// {
//   item: {
//     isLoading: false,
//       data: [],
//         item: { }
//   },
//   user: {
//     users: [],
//       isLoading: false
//   },
//   notification: {
//     isLoading: false
//   }
// }