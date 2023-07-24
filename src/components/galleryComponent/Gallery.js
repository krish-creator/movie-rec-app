import React from 'react'
import './Gallery.css'
import { Col, Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const Gallery = (props) => {

    const { movieId, imageUrl, cardTitle, cardSubtitle } = props

    const navigate = useNavigate()

    const handleOverview = (movieId) => {
        navigate(`/overview?movieId=${movieId}`);
    };

    return (
        <Col sm="3" className="my-2">
            <div className='container'>
                <Card>
                    <CardImg top src={imageUrl} alt="Card image cap" className='card-img' onClick={() => handleOverview(movieId)} />
                    <CardBody>
                        <CardTitle className='card-title'>{cardTitle}</CardTitle>
                        <CardSubtitle className='card-subtitle'>{cardSubtitle}</CardSubtitle>
                    </CardBody>
                </Card>
            </div>
        </Col>
    )
}

export default Gallery