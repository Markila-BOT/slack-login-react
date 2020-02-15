import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userFetchData } from '../../actions';
import { capitalizeFirstLetter } from '../../common/capitalizeLetter';
import MessageDialouge from './MessageDialogue';
import {
  Grid,
  Segment,
  Button,
  Header,
  Input,
  Form,
  Checkbox
} from 'semantic-ui-react';

export class UserLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const params = { ...this.state, team: this.props.match.params.teamId };
    this.props.fetchUser(params, this.props.history);
  };

  message = (<>Sorry, you entered an incorrect email address or password.</>);

  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column className="gridContainer">
          {!this.props.user.ok &&
            this.props.user.error === 'user_not_found' && (
              <MessageDialouge message={this.message} />
            )}
          <Form onSubmit={this.handleSubmit}>
            <Segment padded={'very'}>
              <Header as="h1" textAlign="center">
                Sign in to {capitalizeFirstLetter(this.props.match.params.team)}
              </Header>
              <p>{this.props.match.params.team}.slack.com</p>
              <div className="inputBox">
                <p className="desParagraph">
                  Enter your <strong>email address</strong> and{' '}
                  <strong>password.</strong>
                </p>

                <Input
                  fluid
                  name="email"
                  placeholder="you@example.com"
                  onChange={this.handleChange}
                  type="email"
                />

                <Input
                  fluid
                  name="password"
                  placeholder="password"
                  onChange={this.handleChange}
                  type="password"
                />

                <p>
                  <Button
                    disabled={this.props.isLoading || this.props.itemsHaveError}
                    loading={this.props.isLoading}
                    color="teal"
                    fluid
                    size="huge"
                  >
                    Sign in
                  </Button>
                </p>

                <Checkbox label="Remember Me" className="check" />

                <p>
                  <a href="/notnow">Forgot Password?</a> .{' '}
                  <a href="/notnow">Forgot which email you used?</a>
                </p>
              </div>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isLoading: state.userAreLoading,
    hasError: state.userHaveError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (domain, history) => dispatch(userFetchData(domain, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginContainer);
