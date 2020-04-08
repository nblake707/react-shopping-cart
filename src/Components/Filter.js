//Used rcc +  tab to create this class
import React, { Component } from 'react';

//This filter bar is used to order items by price and size
export default class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4>">
        {this.props.count} products found. 
        </div>
        <div className="col-md-4>">
          <label>
            Order by
            <select
              className="form-control"
              value={this.props.sort}
              onChange={this.props.handleChangeSort}
            >
            {/* forgot to set value and this effected the ablity of items to sort */}
              <option value="">Select</option>
              <option value="lowest">Lowest to highest</option>
              <option value="highest">Highest to Lowest</option>
            </select>
          </label>
        </div>
        <div className="col-md-4>">
        <label>
            Filter size
            <select
              className="form-control"
              value={this.props.size}
              onChange={this.props.handleChangeSize}
            >
           
              <option value="">Select</option>
              <option value="lowest">Lowest to highest</option>
              <option value="highest">Highest to Lowest</option>
            </select>
          </label>
        
        </div>
      </div>
    );
  }
}
