import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import User from './User';

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <ItemStyles>
            {item.image && <img src={item.image} alt={item.title} />}

            <Title>
              <Link
                href={{
                  pathname: '/item',
                  query: { id: item.id },
                }}
              >
                <a>{item.title}</a>
              </Link>
            </Title>
            <PriceTag>{formatMoney(item.price)}</PriceTag>
            <p>{item.description}</p>
            {me ? (
              <div className="buttonList">
                <Link
                  href={{
                    pathname: 'update',
                    query: { id: item.id },
                  }}
                >
                  <a>Edit ✏️</a>
                </Link>
                <DeleteItem id={item.id}>Delete</DeleteItem>

                <AddToCart id={item.id} />
              </div>
            ) : (
              <div className="signedOutButtonList">
                <AddToCart />
              </div>
            )}
          </ItemStyles>
        )}
      </User>
    );
  }
}
