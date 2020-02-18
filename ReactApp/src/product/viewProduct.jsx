import React from 'react';
import * as APICalls from './../api/api'
import {calculatePrice,calculateYouSave} from "./../utils/util";
import Error from "./../error";

class ViewProduct extends React.Component {
  constructor(){
    super();
    this.state={
        selectedProduct :"",
        errorMessage:""
    }
  }
  
  componentDidMount(){
    APICalls.getProductById(this.props.match.params.productId)
            .then( response =>{ 
              this.setState({selectedProduct : response});
            })
            .catch( errorMessage =>{
              this.setState({errorMessage});
            })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.selectedProduct && <div className="container top-space">
          <div className="row">
            <div className="col-md-4 col-sm-7">
              <img className="img-thumbnail" src={this.state.selectedProduct.productImages[0]} alt={this.state.selectedProduct.productName} />
              <br /><br />
              <div className="row">
                <div className="col-md-7">
                  <button className="btn btn-outline-dark btn-md btn-block">
                    <i className="material-icons">shopping_cart</i>
                    <span className="align-straight">Add to Cart</span> </button></div>
                <div className="col-md-5">
                  <button className="btn btn-outline-dark btn-md btn-block">
                    <i className="material-icons">play_arrow</i>
                    <span className="align-straight">Buy Now</span>
                  </button></div>
              </div>
            </div>
            <div className="col-md-7">
              <h4 className="blue-header">{this.state.selectedProduct.productName}</h4>
              <h6><span className="badge badge-primary">{this.state.selectedProduct.rating}</span></h6>
              <table>
                <tbody>
                  <tr>
                    <td>MRP </td>
                    <td>: <strike>&#8377; {this.state.selectedProduct.productActualPrice}</strike></td>
                  </tr>
                  <tr>
                    <td>Price </td>
                    <td>: <span className="price-text blue-body">&#8377; {calculatePrice(this.state.selectedProduct.productActualPrice, this.state.selectedProduct.discount)}</span></td>
                  </tr>
                  <tr>
                    <td>You Save </td>
                    <td>: <span className="blue-body">&#8377; {calculateYouSave(this.state.selectedProduct.productActualPrice, this.state.selectedProduct.discount)} ({this.state.selectedProduct.discount}%)</span></td>
                  </tr>
                </tbody>
              </table><br/>
              <h5 className="blue-header">Description</h5>
              <p className="blue-body">{this.state.selectedProduct.description}</p>
              <h5 className="blue-header">Highlight</h5>
              <ul className="blue-body">{this.state.selectedProduct.highlights.map((highlight, key) => <li key={key}>{highlight}</li>)}
              </ul>
            </div>
          </div>
        </div>}
        {this.state.errorMessage && <Error message={this.state.errorMessage} />}
      </React.Fragment>
    );
  }
}
 
export default ViewProduct;