import React from 'react'
import './Gallery.css'
import { Col, Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const Gallery = (props) => {
    return (
        <Col sm="3" className="my-2">
            <Card>
                <CardImg top width="100%" src={props.imageUrl} alt="Card image cap" className='card-img' />
                <CardBody>
                    <CardTitle className='card-title'>{props.cardTitle}</CardTitle>
                    <CardSubtitle className='card-subtitle'>{props.cardSubtitle}</CardSubtitle>
                </CardBody>
            </Card>
        </Col>
    )
}

export default Gallery