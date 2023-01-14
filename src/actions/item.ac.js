import { errorHandler } from "../utils/errorHandler"
import { httpClient } from "../utils/httpClient"
import { notify } from "../utils/notify"

export const ItemActionTypes = {
  SET_IS_LOADING: 'SET_IS_LOADING',
  ITEMS_RECEIVED: 'ITEMS_RECEIVED',
  ITEM_RECEIVED: 'ITEM_RECEIVED',
  ITEM_REMOVED: 'ITEM_REMOVED',
  SET_IS_SEARCHING: 'SET_IS_SEARCHING',
  SEARCH_RESULT_RECEIVED: 'SEARCH_RESULT_RECEIVED',
  REVIEW_ADDED: 'REVIEW_ADDED'
}

export const fetchItems_ac = condition => dispatch => {
  console.log('at action file >>', condition)
  dispatch(loading(true))

  httpClient.GET('/item', true)
    .then(({ data }) => {
      dispatch({
        type: ItemActionTypes.ITEMS_RECEIVED,
        payload: data
      })
    })
    .catch(err => {
      errorHandler(err)
    })
    .finally(() => {
      dispatch(loading(false))
    })

}

export const removeItem_ac = id => dispatch => {
  httpClient.DELETE(`/item/${id}`, true)
    .then(response => {
      notify.showInfo("Item Removed")
      dispatch({
        type: ItemActionTypes.ITEM_REMOVED,
        id: id
      })
    })
    .catch(err => {
      errorHandler(err)
    })
}

export const fetchItem_ac = (id) => dispatch => {
  dispatch(loading(true))
  httpClient.GET(`/item/${id}`, true)
    .then(({ data }) => {
      dispatch({
        type: ItemActionTypes.ITEM_RECEIVED,
        payload: data
      })
    })
    .catch(err => {
      errorHandler(err)
    })
    .finally(() => {
      dispatch(loading(false))
    })
}

export const searchItem_ac = (searchParams) => dispatch => {
  dispatch(searching(true))
  httpClient.POST(`/item/search`, searchParams)
    .then(({ data }) => {
      dispatch({
        type: ItemActionTypes.SEARCH_RESULT_RECEIVED,
        payload: data
      })
    })
    .catch(err => {
      errorHandler(err)
    })
    .finally(() => {
      dispatch(searching(false))
    })
}

export const addReview_ac = (data, itemId) => dispatch => {
  httpClient.POST(`/item/add-review/${itemId}`, data, true)
    .then(({ data }) => {
      dispatch({
        type: ItemActionTypes.REVIEW_ADDED,
        payload: data
      })
    })
    .catch(err => {
      errorHandler(err)
    })

  // TODO
  // if we are unauthenticated,
  // step 1 redirect to login
  // step 2 once login redirect again to add review page
  // NOTE :- review data must be preserved
}

const loading = isLoading => ({
  type: ItemActionTypes.SET_IS_LOADING,
  payload: isLoading
})

const searching = isSearching => ({
  type: ItemActionTypes.SET_IS_SEARCHING,
  payload: isSearching
})