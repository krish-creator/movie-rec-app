import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import apiUrls from '../../api/utils/apiUrls.json'
import apiReference from '../../api/services/apiReference'
import formatDate from '../../utils/formatDate'
import formatUrl from '../../utils/fromatUrl'

import './Overview.css'

const Overview = (props) => {

    const params = useParams()
    const pageNo = params.page ? params.page : '1'

    const [searchParams] = useSearchParams()
    const [movieId, setMovieId] = useState(null)
    const [config, setConfig] = useState(null)
    const [overview, setOverview] = useState(null)
    const [movieInfo, setMovieInfo] = useState(null)

    useEffect(() => {
        setMovieId(searchParams.get('movieId'))
    }, [searchParams])

    useEffect(() => {
        apiReference(apiUrls.config).then((data) => setConfig(data))
    }, [])

    useEffect(() => {
        apiReference(props.overviewUrl, movieId, pageNo).then((data) => setOverview(data))
    }, [props.overviewUrl, movieId, pageNo])

    // const totalPages = overview ? overview.total_pages : null
    const imageBaseUrl = config ? config.images.base_url : null


    useEffect(() => {
        overview &&
            setMovieInfo(
                {
                    ...overview,
                    backdrop_path: formatUrl(imageBaseUrl, overview.backdrop_path),
                    release_date: formatDate(overview.release_date)
                }
            )
    }, [imageBaseUrl, overview])

    // useEffect(() => {
    //     console.log(movieInfo.release_date);
    // }, [movieInfo])

    return (

        <>
            {
                movieInfo &&
                <div className='overview'>
                    <img src={movieInfo.backdrop_path} alt="" className="img-fluid overview-poster" />
                    <div className="overview-text" >
                        <div className="overview-title">
                            {movieInfo.original_title}
                            <div>
                                {movieInfo.release_date}
                            </div>
                        </div>

                        <div className="overview-synopsis">
                            {movieInfo.overview}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Overview