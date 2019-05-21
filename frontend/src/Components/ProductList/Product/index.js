import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from '../../Thumb';
import { addProduct } from '../../../Services/cart/actions';

import x_png from "../../../Icons/x.png";
import { deleteDatabase } from '../../../Services/shelf/actions';

const Product = ({ product, products, addProduct, deleteDatabase }) => {
  product.quantity = 1;

  let formattedPrice = product.price.toFixed(2);

  let file_name = product.sku;
  try {
    require(`../../../Images/${product.sku}.jpg`)
  } catch(err) {file_name = `None`}

  return (
    <div
      className="shelf-item"
      data-sku={product.sku}
    >
      <span class='productx'>
        <img class='productx-x' src={x_png} alt='x.png' id={product.id} 
             onClick={() => deleteDatabase(product.id, products)} width='20px' height='20px'/>
      </span>
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../Images/${file_name}.jpg`)}
        alt={`../../../Images/None.jpg`}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
      </div>
      <div className="shelf-item__buy-btn" onClick={() => addProduct(product)}>Add to cart</div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  deleteDatabase: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct , deleteDatabase}
)(Product);
