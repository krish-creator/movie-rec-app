import './Main.css';
import Card from '../cardComponent/Card'
import billboard from '../../assets/movie-billboard.jpg'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import apiUrls from '../../api/utils/apiUrls.json'
import apiReference from '../../api/services/apiReference';
import formatDate from '../../utils/formatDate';
import formatUrl from '../../utils/fromatUrl';


const Main = () => {

    const [config, setConfig] = useState(null)
    const [trending, setTrending] = useState(null)
    const [nowPlaying, setNowPlaying] = useState(null)
    const [topRated, setTopRated] = useState(null)

    useEffect(() => {
        apiReference(apiUrls.config).then((data) => setConfig(data))
    }, [])

    useEffect(() => {
        apiReference(apiUrls.trendingMovies).then((data) => setTrending(data))
    }, [])

    useEffect(() => {
        apiReference(apiUrls.nowPlayingMovies).then((data) => setNowPlaying(data))
    }, [])

    useEffect(() => {
        apiReference(apiUrls.topRatedMovies).then((data) => setTopRated(data))
    }, [])

    const imageBaseUrl = config ? config.images.base_url : null

    const trendingResult = trending ? trending.results : null
    const trendingMovies = trendingResult
        ? trendingResult.map(movie => {
            return {
                ...movie,
                backdrop_path: formatUrl(imageBaseUrl, movie.backdrop_path),
                release_date: formatDate(movie.release_date)
            }
        })
        : null

    const nowPlayingResult = nowPlaying ? nowPlaying.results : null
    const nowPlayingMovies = nowPlayingResult
        ? nowPlayingResult.map(movie => {
            return {
                ...movie,
                backdrop_path: formatUrl(imageBaseUrl, movie.backdrop_path),
                release_date: formatDate(movie.release_date)
            }
        })
        : null

    const topRatedResult = topRated ? topRated.results : null
    const topRatedMovies = topRatedResult
        ? topRatedResult.map(movie => {
            return {
                ...movie,
                backdrop_path: formatUrl(imageBaseUrl, movie.backdrop_path),
                release_date: formatDate(movie.release_date)
            }
        })
        : null


    const cards = [
        { id: 1, title: "Trending", apiResult: trendingMovies },
        { id: 2, title: "Now Playing", apiResult: nowPlayingMovies },
        { id: 3, title: "Top Rated", apiResult: topRatedMovies },

    ]

    const cardsEl = cards.map(card => {
        return (
            card.apiResult && <Card key={card.id} cardTitle={card.title} movieResult={card.apiResult} />
        )
    })

    return (
        <div className="Main">
            <img src={billboard} alt="movie-billboard" className='img-fluid' />
            {cardsEl}
        </div>
    );
}

export default Main;
