import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { format } from 'date-fns';
import PleaseSignIn from './PleaseSignIn';
import User from './User';

class Account extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <User>
            {({ data: { me } }) => <p>hello there there {me.name}</p>}
          </User>
        </PleaseSignIn>
      </div>
    );
  }
}

export default Account;
