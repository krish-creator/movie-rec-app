import './Card.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const Card = (props) => {

    const movieCardEl = props.movieResult
        ? props.movieResult.map(movie => {
            return (
                <SwiperSlide key={movie.id}>
                    <div className="card p-0 m-2 movie-card" >
                        <img src={movie.backdrop_path} className="card-img-top p-0" alt="card-poster" />
                        <div className="card-body">
                            <h5 className="card-title fw-bold fs-6 fs-md-4">{movie.title}</h5>
                            <p className="card-text fs-6 fs-md-4">{movie.release_date}</p>
                        </div>
                    </div>
                </SwiperSlide>
            )
        })
        : null

    return (
        <section className="container-fluid px-5">
            <h1 className="display-5 py-3 card-title">{props.cardTitle}</h1>
            <div className="card-container">
                <Swiper
                    loop={true}
                    breakpoints={{
                        // Breakpoints based on screen sizes
                        320: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        992: { slidesPerView: 5 },
                    }}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {movieCardEl}
                </Swiper>
            </div >
        </section>
    )
}

export default Card