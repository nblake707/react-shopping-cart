import React from "react";
import Products from "./Components/Products";
import Filter from "./Components/Filter";
import Basket from "./Components/Basket";

class App extends React.Component {
  // intializing state in the constructor
  constructor(props) {
    super(props);
    this.state = {
      products: [], // Array that holds results from
      filteredProducts: [], // Needed to present a sorted array to the user
      cartItems: [], // Array holding all items in cart
      sort: "", // holds the user sort preferences - selection is made in the filter component
      size: "" // holds the user size preferences - selection is made in the filter component
    };

    // bind in constructor
    // binding event handler to 'this' keyword : could also write the function in arrow notation for the same effect
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
  }

  // need to run json-server public/db.json --port 8080
  componentDidMount() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data =>
        this.setState({
          products: data,
          filteredProducts: data
        })
      );
      if(localStorage.getItem('cartItem')){
        this.setState({cartItems: JSON.parse(localStorage.getItem('cartItems'))});
      }
  }

  handleRemoveCart(e) {

  }

  handleAddCart(e, product){
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyIncart = false;
      cartItems.forEach(item => {
        if (item.id === product.id){
          productAlreadyIncart = true;
          item.count += 1;
        }
      });
      if(!productAlreadyIncart){
        cartItems.push({...product, count:1});
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
      return cartItems;

    })

  }

  // This event handler is passed into the filter component
  handleChangeSort(e) {
    this.setState({ sort: e.target.value }); //sets sort value from dropdown selection - this determines if the user wants to see items high-low vs low-high
    this.listProducts();
  }

  handleChangeSize(e) {
    this.setState({ size: e.target.value });
    this.listProducts();
  }

  // logic that allows users to filter page items
  listProducts() {
    this.setState(state => {
      //////////////// Filtering By Price ////////////////////////
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowest" //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id < b.id ? 1 : -1)); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
      }
      //////////////// Filtering By Size ////////////////////////
      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            a =>
              //indexOf returns the index value of a particular array element. Returns -1 if not found
              a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )
        };
      }

      return { filteredProducts: state.products };
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Ecommerce Shopping Cart Application</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Filter
              size={this.state.size}
              sort={this.state.sort}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort} 
              count={this.state.filteredProducts.length}
            />
            <br />
            <Products 
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddCart} />
          </div>
          <div className="col-md-4">
            <Basket 
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveCart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
