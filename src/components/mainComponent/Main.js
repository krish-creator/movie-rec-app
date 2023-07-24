import './Main.css';
import Card from '../cardComponent/Card'
import billboard from '../../assets/movie-billboard.jpg'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import apiUrls from '../../api/utils/apiUrls.json'
import apiReference from '../../api/services/apiReference';
import formatDate from '../../utils/formatDate';
import formatUrl from '../../utils/fromatUrl';

const Main = ({ preference }) => {

    const [config, setConfig] = useState(null)
    const [trending, setTrending] = useState(null)
    const [nowPlaying, setNowPlaying] = useState(null)
    const [topRated, setTopRated] = useState(null)
    const [userRecommedations, setUserRecommedations] = useState(null)
    const [cards, setCards] = useState([])

    useEffect(() => {
        apiReference(apiUrls.config).then((data) => {
            const local_config = data.images.base_url
            setConfig(local_config)

            apiReference(apiUrls.trendingMovies).then((data) => {
                const trendingMovies = data.results
                    ? data.results.map(movie => {
                        return {
                            ...movie,
                            backdrop_path: formatUrl(local_config, movie.backdrop_path),
                            release_date: formatDate(movie.release_date)
                        }
                    })
                    : null
                setTrending(trendingMovies)
            })


            apiReference(apiUrls.nowPlayingMovies).then((data) => {

                const nowPlayingMovies = data.results
                    ? data.results.map(movie => {
                        return {
                            ...movie,
                            backdrop_path: formatUrl(local_config, movie.backdrop_path),
                            release_date: formatDate(movie.release_date)
                        }
                    })
                    : null

                setNowPlaying(nowPlayingMovies)
            })
            apiReference(apiUrls.topRatedMovies).then((data) => {

                const topRatedMovies = data.results
                    ? data.results.map(movie => {
                        return {
                            ...movie,
                            backdrop_path: formatUrl(local_config, movie.backdrop_path),
                            release_date: formatDate(movie.release_date)
                        }
                    })
                    : null

                setTopRated(topRatedMovies)
            })
        })
    }, [])

    useEffect(() => {
        apiReference(apiUrls.preferredMovies, preference).then((data) => {
            const userRecommedationsMovies = data && data.results
                ? data.results.map(movie => {
                    return {
                        ...movie,
                        backdrop_path: formatUrl(config, movie.backdrop_path),
                        release_date: formatDate(movie.release_date)
                    }
                })
                : null

            setUserRecommedations(userRecommedationsMovies)
        }
        )
    }, [preference, config])

    useEffect(() => {
        const local_cards = [
            { title: "Recommended", apiResult: preference ? userRecommedations : null },
            { title: "Trending", apiResult: trending },
            { title: "Now Playing", apiResult: nowPlaying },
            { title: "Top Rated", apiResult: topRated },
        ]

        setCards(local_cards)
        // eslint-disable-next-line
    }, [trending, nowPlaying, topRated, userRecommedations])

    return (
        <div className="Main">
            <img src={billboard} alt="movie-billboard" className='img-fluid' />
            {cards.length > 0 && cards.map((card, index) => {
                return (
                    card.apiResult &&
                    <Card
                        key={index}
                        cardTitle={card.title}
                        movieResult={card.apiResult}
                    />
                )
            })}
        </div>
    );
}

export default Main;
