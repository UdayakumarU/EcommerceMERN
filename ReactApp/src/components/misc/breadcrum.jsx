import React, { Component } from 'react'
import { Tile } from  '../../library';

class Breadcrum extends Component{
    render(){
        const {sections} = this.props;
        return <Tile>
            <div className = "row">
                { sections.map( (section) => <span key={section}>{section}</span>) }
            </div>
        </Tile>
    }
}

export default Breadcrum;