import React from 'react'
import './Gallery.css'
import { Col, Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const Gallery = (props) => {

    const navigate = useNavigate()

    const handleOverview = (movieId) => {
        navigate(`/overview?movieId=${movieId}`);
    };

    return (
        <Col sm="3" className="my-2">
            <Card>
                <CardImg top width="100%" src={props.imageUrl} alt="Card image cap" className='card-img' onClick={() => handleOverview(props.movieId)} />
                <CardBody>
                    <CardTitle className='card-title'>{props.cardTitle}</CardTitle>
                    <CardSubtitle className='card-subtitle'>{props.cardSubtitle}</CardSubtitle>
                </CardBody>
            </Card>
        </Col>
    )
}

export default Gallery