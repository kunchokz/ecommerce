import { combineReducers } from 'redux'
import { ItemReducer } from './item.red'

export const RootReducer = combineReducers({
  item: ItemReducer,
})