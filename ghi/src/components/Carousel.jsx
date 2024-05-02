import carousel1 from '../images/carousel1.png'
import carousel2 from '../images/carousel2.png'
import carousel3 from '../images/carousel3.png'

export default function Carousel() {
    return (
        <div className="carousel-container">
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            className="d-block gamester-carousel-image"
                            src={carousel3}
                            alt="Gamester Image"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={carousel1}
                            className="d-block w-100 gamester-carousel-image"
                            alt="Gamester Image"
                        />
                    </div>
                    <div className="carousel-item active">
                        <img
                            src={carousel2}
                            className="d-block w-100 gamester-carousel-image"
                            alt="Gamester Image"
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
