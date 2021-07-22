import React, { Component } from 'react'

class ProductSliderButtons extends Component {
    render() {
        const {rightEnd, leftEnd, moveRight, moveleft} = this.props;
        return (
            <div>
                <div className="_absolute_mid_left">
                    <button className="btn btn-secondary" disabled={leftEnd} onClick={moveleft}>
                        <i className="material-icons">arrow_back_ios</i>
                    </button>
                </div>
                <div className="_absolute_mid_right">
                    <button className="btn btn-secondary" disabled={rightEnd} onClick={moveRight}>
                        <i className="material-icons">arrow_forward_ios</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default ProductSliderButtons;