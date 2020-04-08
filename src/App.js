import React from "react";
import Products from "./Components/Products";
import Filter from "./Components/Filter";

class App extends React.Component {
  //intializing state in the constructor
  constructor(props) {
    super(props);
    this.state = {
      products: [], // Array that holds results from
      filteredProducts: [], // Needed to present a sorted array to the user
      sort: "", // holds the user sort preferences - selection is made in the filter component
      size: "" // holds the user size preferences - selection is made in the filter component
    };

    // bind in constructor
    // binding event handler to 'this' keyword : could also write the function in arrow notation for the same effect
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
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
  }

  //  handleChangeSort = (e) => {
  //   this.setState({sort: e.target.value});
  //   this.listProducts();
  // }

  // This event handler is passed into the filter component
  handleChangeSort(e) {
    this.setState({ sort: e.target.value }); //sets sort value from dropdown selection - this determines if the user wants to see items high-low vs low-high
    this.listProducts();
  }

  handleChangeSize(e) {
    this.setState({ size: e.target.value });
    this.listProducts();
  }

  // handles how the products are filtered on the page
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
          filteredProducts: state.products.filer(
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
        <div classname="row">
          <div className="col-md-8">
            <Filter
              size={this.state.size}
              sort={this.state.sort}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort} //
              count={this.state.filteredProducts.length}
            />
            <br />
            <Products products={this.state.filteredProducts} />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default App;
