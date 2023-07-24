import './Card.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useNavigate } from 'react-router-dom';

const Card = (props) => {

    const { cardTitle, movieResult } = props
    const navigate = useNavigate()

    const handleOverview = (movieId) => {
        navigate(`/overview?movieId=${movieId}`);
    };


    return (
        <section className="container-fluid px-5">
            <h1 className="display-5 py-3 card-main-title">{cardTitle}</h1>
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
                    {
                        movieResult.length > 0
                            ? movieResult.map(movie => {
                                return (
                                    <SwiperSlide key={movie.id} id={movie.id}>
                                        <div className="card p-0 m-2 movie-card" onClick={() => handleOverview(movie.id)}>
                                            <img src={movie.backdrop_path} className="card-img-top p-0" alt="card-poster" />
                                            <div className="card-body">
                                                <h5 className="card-title">{movie.title}</h5>
                                                <p className="card-text">{movie.release_date}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                            : null
                    }
                </Swiper>
            </div >
        </section>
    )
}

export default Card