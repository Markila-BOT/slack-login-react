import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { teamsFetchData } from '../../actions';
import { Grid, Segment, Button, Header, Input, Form } from 'semantic-ui-react';
import MessageDialouge from './MessageDialogue';

export class TeamLoginContainer extends Component {
  state = {
    team: ''
  };

  handleChange = event => {
    this.setState({ team: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.fetchTeam(this.state.team, this.props.history);
  };

  message = (
    <>
      {' '}
      <strong>We couldn’t find your workspace. </strong>
      If you can’t remember your workspace’s address, we can
      <a href="/notnow"> send you a reminder.</a>
    </>
  );

  render() {
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column className="gridContainer">
          {!this.props.postFindTeam.ok &&
            this.props.postFindTeam.error === 'team_not_found' && (
              <MessageDialouge message={this.message} />
            )}
          <Form onSubmit={this.handleSubmit}>
            <Segment padded={'very'}>
              <Header as="h1" textAlign="center">
                Sign in to your workspace
              </Header>
              <div className="inputBox">
                <p>
                  Enter your workspace’s <strong>Slack URL.</strong>
                </p>

                <Input
                  fluid
                  name="team"
                  label=".slack.com"
                  labelPosition="right"
                  placeholder="your-workspace-url"
                  onChange={this.handleChange}
                />

                <p>
                  <Button
                    disabled={this.props.isLoading || this.props.itemsHaveError}
                    loading={this.props.isLoading}
                    color="teal"
                    fluid
                    size="huge"
                  >
                    Continue →
                  </Button>
                </p>

                <p>
                  Don’t know your workspace URL?{' '}
                  <a href="/notnow">Find your workspace</a>
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
    postFindTeam: state.teams,
    isLoading: state.teamsAreLoading,
    hasError: state.teamsHaveError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTeam: (domain, history) => dispatch(teamsFetchData(domain, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TeamLoginContainer));
