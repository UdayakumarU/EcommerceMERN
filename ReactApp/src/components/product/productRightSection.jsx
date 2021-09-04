import { React, Component } from "../../library";

import { calculatePriceAfterDiscount, calculateSavingPrice, numberToPrice } from "../../utils/util";

export default class ProductRightSection extends Component {
    render() {
        const { productName, rating, productActualPrice, discount, description, highlights } = this.props.product;
        return (
          <div>
            <h4>{productName}</h4>
              <h6><span className="badge badge-primary">{rating}</span></h6>
              <table>
                <tbody>
                  <tr>
                    <td>MRP </td>
                    <td>: <strike>&#8377; {productActualPrice}</strike></td>
                  </tr>
                  <tr>
                    <td>Price </td>
                    <td>: <span className="_text_lg_dark">
                            &#8377; {numberToPrice(calculatePriceAfterDiscount(productActualPrice, discount))}
                          </span>
                    </td>
                  </tr>
                  <tr>
                    <td>You Save </td>
                    <td>: <span>
                            &#8377; {numberToPrice(calculateSavingPrice(productActualPrice, discount))} ({discount}%)
                          </span>
                    </td>
                  </tr>
                </tbody>
              </table><br/>
              <h5>Description</h5>
              <p>{description}</p>
              <h5>Highlight</h5>
              <ul>{highlights.map((highlight, key) => <li key={key}>{highlight}</li>)}
              </ul>
            </div>
        )
    }
}
