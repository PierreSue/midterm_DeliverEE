import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from '../../Thumb';
import { addDatabase } from '../../../Services/shelf/actions';

const EmptyProduct = ({ product, products, addDatabase }) => {
  let Newproduct = product;

  return (
    <div
      className="shelf-empty-item"
    >
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../Images/${product.sku}.jpg`)}
      />
      <p className="shelf-item__title"><u>New Product</u></p>
      <br></br>{'Image Name\t:\t'}
      <input className="shelf-item__input"
             type="text"
             style={{ width: "70px", height: "20px", 
                      "margin-bottom": "5px", "border-radius": "15%"}}
             onChange={e => Newproduct.newsku = e.target.value }
             placeholder={" Ex.十鮮麵"}>
      </input>
      <br></br>{'Title\t:\t'}
      <input className="shelf-item__input"
             type="text"
             style={{ width: "135px", height: "20px", 
                      "margin-bottom": "5px", "border-radius": "15%"}}
             onChange={e => Newproduct.newtitle = e.target.value }
             placeholder={" Ex.二八麵堂-十鮮麵"}>
      </input>
      <br></br>{'Price\t:\t'}
      <input className="shelf-item__input"
             type="number"
             style={{ width: "130px", height: "20px", 
                      "margin-bottom": "5px", "border-radius": "15%"}}
             onChange={e => Newproduct.newprice = Number(e.target.value)}
             placeholder={" Ex.100"}>
      </input>
      <br></br>{'Cat\t:\t'}
      <input className="shelf-item__input"
             type="text"
             style={{ width: "130px", height: "20px", 
                      "margin-bottom": "5px", "border-radius": "15%"}}
             onChange={e => Newproduct.newcat = e.target.value }
             placeholder={" Ex.Noddles"}>
      </input>
      <br></br>{'Store\t:\t'}
      <input className="shelf-item__input"
             type="text"
             style={{ width: "130px", height: "20px", 
                      "margin-bottom": "5px", "border-radius": "15%"}}
             onChange={e => Newproduct.newstore = e.target.value }
             placeholder={" Ex.二八麵堂"}>
      </input>
      <div className="shelf-item__buy-btn" onClick={() => addDatabase(Newproduct, products)}>Add to Database</div>
    </div>
  );
};

EmptyProduct.propTypes = {
  product: PropTypes.object.isRequired,
  addDatabase: PropTypes.func.isRequired
};

export default connect(
  null,
  { addDatabase }
)(EmptyProduct);
