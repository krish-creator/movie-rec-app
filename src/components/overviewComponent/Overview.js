import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import apiUrls from '../../api/utils/apiUrls.json'
import apiReference from '../../api/services/apiReference'
import formatDate from '../../utils/formatDate'
import formatUrl from '../../utils/fromatUrl'
import { Container } from "reactstrap"

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
        setMovieInfo(
            {
                ...overview,
                backdrop_path: overview ? formatUrl(imageBaseUrl, overview.backdrop_path) : {},
                release_date: overview ? formatDate(overview.release_date) : {}
            }
        )
    }, [imageBaseUrl, overview])

    return (

        <>
            {
                movieInfo
                &&
                <Container fluid>
                    <div className='overview'>
                        Overview Movie ID : {movieId}
                        <br />
                        Movie Title : {movieInfo.original_title}
                        <br />
                        <br />
                    </div>

                    <img src={movieInfo.backdrop_path} alt="" />

                    <div>
                        <br />
                        <br />
                        JSON Data :   {JSON.stringify(movieInfo)}
                    </div>

                </Container>
            }
        </>
    )
}

export default Overview