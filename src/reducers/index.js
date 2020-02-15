import { combineReducers } from 'redux';
import { teams, teamsHaveError, teamsAreLoading } from './postFindTeamReducer';
import { user, userHaveError, userAreLoading } from './postFindUserReducer';

export default combineReducers({
  teams,
  teamsHaveError,
  teamsAreLoading,
  user,
  userHaveError,
  userAreLoading
});
