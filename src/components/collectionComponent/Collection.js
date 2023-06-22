import Gallery from "../galleryComponent/Gallery"
import { useEffect, useState } from "react"
import apiUrls from '../../api/utils/apiUrls.json'
import apiReference from '../../api/services/apiReference'
import formatDate from '../../utils/formatDate'
import formatUrl from '../../utils/fromatUrl'
import { Container, Row } from "reactstrap"
import CollectionFooter from "../collectionFooterComponent/CollectionFooter"
import { useParams, useSearchParams } from "react-router-dom"


const Collection = (props) => {

    const params = useParams()
    const pageNo = params.page ? params.page : '1'

    const [searchParams] = useSearchParams()
    const [config, setConfig] = useState(null)
    const [collection, setCollection] = useState(null)
    const [searchKey, setSearchKey] = useState(null)

    useEffect(() => {
        setSearchKey(searchParams.get('query'))
    }, [searchParams])

    useEffect(() => {
        apiReference(apiUrls.config).then((data) => setConfig(data))
    }, [])

    useEffect(() => {
        apiReference(props.collectionUrl, searchKey, pageNo).then((data) => setCollection(data))
    }, [props.collectionUrl, searchKey, pageNo])

    // const totalPages = collection ? collection.total_pages : null
    const imageBaseUrl = config ? config.images.base_url : null
    const collectionResult = collection ? collection.results : null
    const collectionMovies = collectionResult
        ? collectionResult.map(movie => {
            return {
                ...movie,
                backdrop_path: formatUrl(imageBaseUrl, movie.backdrop_path),
                release_date: formatDate(movie.release_date)
            }
        })
        : null

    const galleryEl = collectionMovies
        ? collectionMovies.map(card => {
            return (
                card && <Gallery key={card.id} movieId={card.id} imageUrl={card.backdrop_path} cardTitle={card.title} cardSubtitle={card.release_date} />
            )
        })
        : null

    return (
        <>
            <Container fluid className="my-5">
                <Row>
                    {galleryEl}
                </Row>
            </Container>
            <CollectionFooter totalPages="5" currentPage={pageNo} />
        </>



    )
}

export default Collection