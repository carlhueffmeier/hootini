import React from 'react';
import User from './User';
import Signin from './Signin';

const PleaseSignIn = props => (
  <User>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data || !data.me) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
  </User>
);

export default PleaseSignIn;
