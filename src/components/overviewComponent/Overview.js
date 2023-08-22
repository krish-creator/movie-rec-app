import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import apiUrls from '../../api/utils/apiUrls.json'
import apiReference from '../../api/services/apiReference'
import formatDate from '../../utils/formatDate'
import formatUrl from '../../utils/fromatUrl'

import './Overview.css'

const Overview = (props) => {

    const params = useParams()
    const [searchParams] = useSearchParams()

    const [pageNo, setPageNo] = useState('1')
    const [movieId, setMovieId] = useState(null)
    const [config, setConfig] = useState(null)
    const [overview, setOverview] = useState([])

    useEffect(() => {
        setPageNo(params.page ? params.page : '1')
    }, [params.page])

    useEffect(() => {
        setMovieId(searchParams.get('movieId'))
    }, [searchParams])

    useEffect(() => {
        apiReference(apiUrls.config).then((data) => setConfig(data.images.base_url))
    }, [])

    useEffect(() => {
        apiReference(props.overviewUrl, movieId, pageNo).then((data) => {
            setOverview(
                {
                    ...data,
                    backdrop_path: formatUrl(config, data.backdrop_path),
                    release_date: formatDate(data.release_date)
                }
            )
        }
        )
    }, [props.overviewUrl, movieId, pageNo, config])

    return (
        <>
            {
                <div className='overview'>
                    <img src={overview.backdrop_path} alt="" className="img-fluid overview-poster" />
                    <div className="overview-text" >
                        <div className="overview-title">
                            {overview.original_title}
                            <div>
                                {overview.release_date}
                            </div>
                        </div>
                        <div className="overview-synopsis">
                            {overview.overview}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Overview