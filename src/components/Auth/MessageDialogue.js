import React from 'react';
import PropTypes from 'prop-types';

import { Message, Icon } from 'semantic-ui-react';

function MessageDialouge(props) {
  return (
    <Message icon>
      <Icon name="warning sign" color="red" size="mini" />
      <Message.Content>{props.message}</Message.Content>
    </Message>
  );
}

MessageDialouge.propTypes = {
  message: PropTypes.node.isRequired
};

MessageDialouge.defaultProps = {
  message: null
};

export default MessageDialouge;
