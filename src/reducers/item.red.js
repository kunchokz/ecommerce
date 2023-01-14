import { ItemActionTypes } from "../actions/item.ac"

const defaultState = {
  isLoading: false,
  items: [],
  item: {},
  searchResults: [],
  isSearching: false
}
export const ItemReducer = (state = defaultState, action) => {
  // console.log('state in reducer >>', state)
  console.log('action in reducer >>', action)
  switch (action.type) {

    case ItemActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case ItemActionTypes.ITEMS_RECEIVED:
      return {
        ...state,
        items: action.payload
      }
    case ItemActionTypes.ITEM_RECEIVED:
      return {
        ...state,
        item: action.payload
      }
    case ItemActionTypes.REVIEW_ADDED:
      return {
        ...state,
        searchResults: [action.payload] //search results because our details component is ussing searchResults data
      }

    case ItemActionTypes.SET_IS_SEARCHING:
      return {
        ...state,
        isSearching: action.payload
      }
    case ItemActionTypes.SEARCH_RESULT_RECEIVED:
      return {
        ...state,
        searchResults: action.payload
      }

    case ItemActionTypes.ITEM_REMOVED:
      const { items } = state;
      items.forEach((item, index) => {
        if (item._id === action.id) {
          items.splice(index, 1);
        }
      })
      return {
        ...state,
        items: [...items]
      }

    default: {
      return {
        ...state
      }
    }
  }

}