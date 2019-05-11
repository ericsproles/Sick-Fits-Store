import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  createOrder: ({ render }) => (
    <Mutation
      mutation={CREATE_ORDER_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {render}
    </Mutation>
  ),
});

class TakeMyMoney extends React.Component {
  onToken = async (res, createOrder) => {
    console.log('On token called');
    console.log('res.id', res.id);
    NProgress.start();
    // manually call the mutation once we have the stripe token
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  };
  render() {
    return (
      <Composed>
        {({ user, loading, createOrder }) => {
          const me = user.data.me;
          if (loading) return null;
          return (
            <StripeCheckout
              amount={calcTotalPrice(me.cart)}
              name="Sick Fits"
              description={`Order of ${totalItems(me.cart)} items!`}
              image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
              stripeKey="pk_test_PNihNO0pN8zkP5S1E6F69x1T"
              currency="USD"
              email={me.email}
              token={res => this.onToken(res, createOrder)}
            >
              {this.props.children}
            </StripeCheckout>
          );
        }}
      </Composed>
    );
  }
}

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
