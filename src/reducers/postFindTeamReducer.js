import {
  TEAMS_HAVE_ERROR,
  TEAMS_ARE_LOADING,
  TEAMS_FETCH_DATA_SUCCESS
} from '../actions/actionTypes';

export function teamsHaveError(state = false, action) {
  switch (action.type) {
    case TEAMS_HAVE_ERROR:
      return action.hasError;

    default:
      return state;
  }
}

export function teamsAreLoading(state = false, action) {
  switch (action.type) {
    case TEAMS_ARE_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}

export function teams(state = [], action) {
  switch (action.type) {
    case TEAMS_FETCH_DATA_SUCCESS:
      return action.teams;

    default:
      return state;
  }
}
