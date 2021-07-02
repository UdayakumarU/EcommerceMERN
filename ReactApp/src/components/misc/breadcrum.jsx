import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { Tile } from  '../../library';

class Breadcrum extends Component{
    render(){
        const {sections} = this.props;
        return <Tile>
            <div className = "row">
                { 
                    sections.map( section => (
                        <span key={section.id} className="_flex_container">
                           {section.link ? (
                                <Link to={section.link} className="_flex_item">{section.name}</Link> ) :  
                                <span className="_flex_item">{section.name}</span>
                            }
                            {section.link && <span className="_flex_item">&#8811;</span>}
                        </span> )
                    )
                }
            </div>
        </Tile>
    }
}

export default Breadcrum;