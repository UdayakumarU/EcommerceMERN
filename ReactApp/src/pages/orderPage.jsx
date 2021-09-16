import { React, Component } from "../library";

import Header from "../components/misc/header";
import Footer from "../components/misc/footer";
import Directory from "../components/misc/directory";

class OrderPage extends Component {
    render() {  
        return (
            <React.Fragment>
                <Header/>
                <Directory/>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default OrderPage;