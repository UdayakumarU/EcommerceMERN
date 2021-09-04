import { React, Component, Link } from "../../library";

class Breadcrum extends Component{
    render(){
        const {sections} = this.props;
        return(
            <div className="container ml-0 pt-3 pb-3">
                <div className = "row">
                    {
                        sections.map( section => (
                            <span key={section.id} className="_flex_container small">
                                {section.link ? (
                                    <Link to={section.link} className="_flex_item">{section.name}</Link> ) :
                                    <span className="_flex_item">{section.name}</span>
                                }
                                {section.link && <span className="_flex_item">&#8811;</span>}
                            </span> 
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Breadcrum;