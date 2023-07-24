import Gallery from "../galleryComponent/Gallery"
import { useEffect, useState } from "react"
import apiUrls from '../../api/utils/apiUrls.json'
import apiReference from '../../api/services/apiReference'
import formatDate from '../../utils/formatDate'
import formatUrl from '../../utils/fromatUrl'
import { Container, Row } from "reactstrap"
import CollectionFooter from "../collectionFooterComponent/CollectionFooter"
import { useParams, useSearchParams } from "react-router-dom"


const Collection = ({ collectionUrl }) => {

    const params = useParams()
    const [searchParams] = useSearchParams()

    const [pageNo, setPageNo] = useState('1')
    const [config, setConfig] = useState(null)
    const [collection, setCollection] = useState([])
    const [searchKey, setSearchKey] = useState(null)

    useEffect(() => {
        setPageNo(params.page ? params.page : '1')
    }, [params.page])

    useEffect(() => {
        setSearchKey(searchParams.get('query'))
    }, [searchParams])

    useEffect(() => {
        apiReference(apiUrls.config).then((data) => setConfig(data.images.base_url))
    }, [])

    useEffect(() => {
        apiReference(collectionUrl, searchKey, pageNo).then((data) => {
            const collectionMovies = data.results
                ? data.results.map(movie => {
                    return {
                        ...movie,
                        backdrop_path: formatUrl(config, movie.backdrop_path),
                        release_date: formatDate(movie.release_date)
                    }
                })
                : null
            setCollection(collectionMovies)
        })
    }, [collectionUrl, searchKey, pageNo, config])



    return (
        <>
            <Container fluid className="my-5">
                <Row>
                    {collection.length > 0 && collection.map(card => {
                        return (
                            card &&
                            <Gallery
                                key={card.id}
                                movieId={card.id}
                                imageUrl={card.backdrop_path}
                                cardTitle={card.title}
                                cardSubtitle={card.release_date}
                            />
                        )
                    })
                    }
                </Row>
            </Container>
            <CollectionFooter pageCount="5" currentPage={pageNo} />
        </>



    )
}

export default Collection