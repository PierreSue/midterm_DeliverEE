import { FETCH_PRODUCTS, ADD_DATABASE, DELETE_DATABASE} from './actionTypes';
import axios from 'axios';
import uuid from "uuid";

const productsAPI = "http://localhost:3001/api/getData";

const compare = {
  lowestprice: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
  highestprice: (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  }
};

const push_last = (a, b) => {
  if (a.id === -1) return 1;
  if (b.id === -1) return -1;
};

export const fetchProducts = (filters, sortBy, callback) => dispatch => {
  return fetch(productsAPI)
      .then(data => data.json())
      .then(res => {
        let products = res.data;

        if (!!filters && filters.length > 0) {
          products = products.filter(p =>
            filters.find(f => (p.cat === f || p.cat ==='None'))
          );
        }

        if (!!sortBy) {
          products = products.sort(compare[sortBy]);
        }

        products = products.sort(push_last);

        if (!!callback) {
          callback();
        }

        return dispatch({
          type: FETCH_PRODUCTS,
          payload: products
        });
    })
    .catch(err => {
      console.log('Could not fetch products. Try again later.');
    });
};

export const addDatabase = (product, products) => { 
  let id = Math.random();
  axios.post("http://localhost:3001/api/putData", {
      id: id,
      sku: product.newsku,
      title: product.newtitle,
      price: product.newprice,
      cat: product.newcat,
      store: product.newstore
  });

  let NewProduct = {id:id, 
                    sku : product.newsku,
                    title : product.newtitle,
                    price : product.newprice,
                    cat : product.newcat,
                    store : product.newstore,
                    currencyId : "NTD",
                    currencyFormat : "$"
  }
  console.log(products)
  let len = products.length-1;
  products[len+1] = products[len];
  products[len] = NewProduct;
  console.log(products)
  return ({
    type: ADD_DATABASE,
    payload: products
  });
};

export const deleteDatabase = (product_id, products) => {
  console.log(product_id)
  console.log(products)
  axios.delete("http://localhost:3001/api/deleteData", {
    data: {
      id: product_id
    }
  });

  products = products.filter(p =>(p.id !== product_id));
  console.log(products)
  return ({
    type: DELETE_DATABASE,
    payload: products
  });
};