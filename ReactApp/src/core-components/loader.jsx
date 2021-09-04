import { React }  from "../library";

const Loader = () => (
    <div className="_page_overlay">
        <div className="_center_child">
            <div className="spinner-border text-warning _loader_lg" role="status">
                <span className="sr-only" >Loading...</span>
            </div>
        </div>
    </div>
)

export default Loader;