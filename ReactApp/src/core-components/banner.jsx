import { React } from "../library";

const Banner = ({items}) => (
  <div id="carouselExampleIndicators" className="carousel slide _bottom_space" data-ride="carousel">
    <div className="carousel-inner">
      {
        items.length > 0 && items.map((item,index) => (
          <div className={`carousel-item ${index === 0?'active':''}`} key={index}>
            <img className="d-block w-100" src={item.imageUrl} alt={item.altName} />
          </div>)
        )
      }
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
);

export default Banner;

