import React, { Component } from 'react';

export default class ProductRightSection extends Component {
    render() {
        const { productName, rating, productActualPrice, discount, description, highlights } = this.props.product;
        return (
          <div>
            <h4 className="blue-header">{productName}</h4>
              <h6><span className="badge badge-primary">{rating}</span></h6>
              <table>
                <tbody>
                  <tr>
                    <td>MRP </td>
                    <td>: <strike>&#8377; {productActualPrice}</strike></td>
                  </tr>
                  <tr>
                    <td>Price </td>
                    {/* <td>: <span className="price-text blue-body">&#8377; {calculatePrice(productActualPrice, discount)}</span></td> */}
                  </tr>
                  <tr>
                    <td>You Save </td>
                    {/* <td>: <span className="blue-body">&#8377; {calculateYouSave(productActualPrice, discount)} ({discount}%)</span></td> */}
                  </tr>
                </tbody>
              </table><br/>
              <h5 className="blue-header">Description</h5>
              <p className="blue-body">{description}</p>
              <h5 className="blue-header">Highlight</h5>
              <ul className="blue-body">{highlights.map((highlight, key) => <li key={key}>{highlight}</li>)}
              </ul>
            </div>
        )
    }
}
