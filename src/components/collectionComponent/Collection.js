import Gallery from "../galleryComponent/Gallery"
import { useEffect, useState } from "react"
import apiUrls from '../../api/utils/apiUrls.json'
import apiReference from '../../api/services/apiReference';
import formatDate from '../../utils/formatDate';
import formatUrl from '../../utils/fromatUrl';
import { Container, Row } from "reactstrap";
import CollectionFooter from "../collectionFooterComponent/CollectionFooter";


const Collection = (props) => {

    const [config, setConfig] = useState(null)
    const [collection, setCollection] = useState(null)
    const [currentPage, setCurrentPage] = useState("1")

    const changePage = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        apiReference(apiUrls.config).then((data) => setConfig(data))
    }, [])

    useEffect(() => {
        apiReference(props.collectionUrl, currentPage).then((data) => setCollection(data))
    }, [props.collectionUrl, currentPage])

    const totalPages = collection ? collection.total_pages : null
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
                card && <Gallery key={card.id} imageUrl={card.backdrop_path} cardTitle={card.title} cardSubtitle={card.release_date} />
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
            <CollectionFooter totalPages="5" changePage={changePage} currentPage={currentPage} />
        </>



    )
}

export default Collection