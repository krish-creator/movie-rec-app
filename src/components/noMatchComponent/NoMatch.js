import React from 'react'
import { Container } from 'react-bootstrap'
import './NoMatch.css'

const NoMatch = () => {
    return (
        <Container fluid className='d-flex justify-content-center align-items-center no-match'>
            <div>Page not found</div>
        </Container>
    )
}

export default NoMatch