import React, { Component } from "react";
import util from '../util';

class Product extends Component {
  render() {
    const productItems = this.props.products.map(product => (
      //must set the key for each item in the products array
      <div className="col-md-4" key={product.id}>
        <div className="thumbnail text-center">
          <a href={`#${product.id}`} onClick={(e) => this.props.handleAddToCart(e, product)}>
            <img src={`/products/${product.sku}_1.jpg`} alt={product.title} />
            <p>{product.title}</p>
          </a>
          <div>
            <b>{util.formatCurrency(product.price)}</b>
            <button
              className="btn btn-primary"
              onClick={(e) => this.props.handleAddToCart(e, product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    )
    );

    return <div classname="row">{productItems}</div>;
  }
}

export default Product;
