import slackEndpoint from '../apis/slackEndpoint';
import {
  TEAMS_HAVE_ERROR,
  TEAMS_ARE_LOADING,
  TEAMS_FETCH_DATA_SUCCESS,
  USER_HAVE_ERROR,
  USER_ARE_LOADING,
  USER_FETCH_DATA_SUCCESS
} from './actionTypes';

export function teamsHaveError(bool) {
  return {
    type: TEAMS_HAVE_ERROR,
    hasError: bool
  };
}

export function teamsAreLoading(bool) {
  return {
    type: TEAMS_ARE_LOADING,
    isLoading: bool
  };
}

export function teamsFetchDataSuccess(teams) {
  return {
    type: TEAMS_FETCH_DATA_SUCCESS,
    teams
  };
}

export function teamsFetchData(url, history) {
  return async dispatch => {
    dispatch(teamsAreLoading(true));

    await slackEndpoint
      .post(`/auth.findTeam`, null, {
        params: {
          domain: url
        }
      })
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(teamsAreLoading(false));
        return response;
      })
      .then(response => {
        dispatch(teamsFetchDataSuccess(response.data));
        if (response.data.ok) {
          history.push(`/user/${url}/${response.data.team_id}`);
        }
      })
      .catch(() => dispatch(teamsHaveError(true)));
  };
}

export function userHaveError(bool) {
  return {
    type: USER_HAVE_ERROR,
    hasError: bool
  };
}

export function userAreLoading(bool) {
  return {
    type: USER_ARE_LOADING,
    isLoading: bool
  };
}

export function userFetchDataSuccess(user) {
  return {
    type: USER_FETCH_DATA_SUCCESS,
    user
  };
}

export function userFetchData(url, history) {
  return async dispatch => {
    dispatch(userAreLoading(true));

    await slackEndpoint
      .post(`/auth.findUser`, null, {
        params: { ...url }
      })
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(userAreLoading(false));
        return response;
      })
      .then(response => {
        dispatch(userFetchDataSuccess(response.data));
        if (response.data.ok) {
          history.push(`/${response.data.user_id}`);
        }
      })
      .catch(() => dispatch(userHaveError(true)));
  };
}
