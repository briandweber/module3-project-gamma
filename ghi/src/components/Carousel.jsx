import gamesterImage from '../images/gamesterImage.png'

export default function Carousel() {
    return (
        <div className="carousel-container">
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            className="d-block w-100 gamester-carousel-image"
                            src={gamesterImage}
                            alt="Gamester Image"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={gamesterImage}
                            className="d-block w-100 gamester-carousel-image"
                            alt="Gamester Image"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={gamesterImage}
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
