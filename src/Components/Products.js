import React, { Component } from "react";

class Product extends Component {
  render() {
    const productItems = this.props.products.map(product => (
      <div className="col-md-4">
        <div className="thumbnail text-center">
          <a href="#" onClick={this.props.handleAddToCart}>
            <img src={`/products/${product.sku}.jpg`} alt={product.title} />
                <p>{product.title}</p>
          </a>
        </div>
      </div>
    ));

    return <div classname="row">{productItems}</div>;
  }
}

export default Product;
