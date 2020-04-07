import React from 'react';
import Products from './Components/Products';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
    };
  }

  //need to run json-server public/db.json --port 8080
  componentDidMount(){
    fetch("http://localhost:8080/products").then(res => res.json())
    .then(data => this.setState({
      products: data,
      filteredProducts: data
    }))
  }

  render(){
    return (
      <div className='container'>
      <h1>Ecommerce Shopping Cart Application</h1>
      <hr/>

      <div classname='row'>
        <div className='col-md-8'>
          <Products products={this.state.filteredProducts} />
        </div>
        <div className='col-md-4'>
        
        </div>
      </div>
      </div>
    );
  }
}

export default App;
