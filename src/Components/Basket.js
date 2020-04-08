// rcc + tab to create class
import React, { Component } from "react";

export default class Basket extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          "Basket is empty"
        ) : (
          <div> You have {cartItems.length} products in the basket.</div>
        )}
        {cartItems.length > 0 && (
          <div>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <b>{item.title}</b>
                  X {item.count}

                  {console.log(item.count)}
                  <button
                    className="btn btn-danger"
                    onClick={e => this.handleRemoveFromCart(e, item)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
