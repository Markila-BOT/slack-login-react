import {
  USER_HAVE_ERROR,
  USER_ARE_LOADING,
  USER_FETCH_DATA_SUCCESS
} from '../actions/actionTypes';

export function userHaveError(state = false, action) {
  switch (action.type) {
    case USER_HAVE_ERROR:
      return action.hasError;

    default:
      return state;
  }
}

export function userAreLoading(state = false, action) {
  switch (action.type) {
    case USER_ARE_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}

export function user(state = [], action) {
  switch (action.type) {
    case USER_FETCH_DATA_SUCCESS:
      return action.user;

    default:
      return state;
  }
}
