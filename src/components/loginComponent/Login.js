import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import { useAuth } from '../../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const redirectPath = location.state?.path || '/'

    const handleLogin = () => {
        auth.login(user)
        navigate(redirectPath, { replace: true })
    }

    return (
        <Container fluid className='d-flex align-items-center justify-content-center login'>
            <Row>
                <Col className='login-col'>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" className='email' onChange={(e) => setUser(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" className='password' />
                    </FloatingLabel>
                    <Button variant="primary" type="submit" className='mt-3' onClick={handleLogin}>
                        Login
                    </Button>
                </Col>
            </Row>
        </Container >
    )
}


export default Login