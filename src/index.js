import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import TeamLoginContainer from './components/Auth/TeamLoginContainer';
import UserLoginContainer from './components/Auth/UserLoginContainer';
import reducer from './reducers';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(reducer, applyMiddleware(thunk));

const User = params => {
  return <h1> Welcome User {params.username} </h1>;
};

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signin" component={TeamLoginContainer} />
      <Route path="/user/:team/:teamId" component={UserLoginContainer} />
      <Route
        path="/:userId"
        render={({ match }) => <User username={match.params.userId} />}
      />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
