import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { userDetailsInDB } from '../../utils/auth'
import { push } from "firebase/database";

const Login = (props) => {

    const { btnLabel, currentUser, setCurrentUser, user, setUser, userDetailsArray } = props

    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false)

    const navigate = useNavigate()

    const login = (user) => {
        for (let i = 0; i < userDetailsArray.length; i++) {
            if (userDetailsArray[i][1].name === currentUser.name) {
                setUser(user)
                setCurrentUser(userDetailsArray[i])
            }
        }
        localStorage.setItem("userName", JSON.stringify(user))
        localStorage.setItem("userDetails", JSON.stringify(currentUser))
    }

    const register = (name, password, genres = [], preference = '') => {
        push(userDetailsInDB, { name, password, genres, preference })
        setUser(null)
        setPassword(null)
    }


    const handleSubmit = (e, action) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        } else {
            if (action === 'Login') {
                login(user)
            } else if (action === 'Register') {
                register(user, password)
            }
            navigate('/', { replace: true })
        }
        setValidated(true)
    }



    return (
        <Container fluid className='d-flex align-items-center justify-content-center login'>
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e, btnLabel)}>
                <Row>
                    <Col className='login-col'>
                        <InputGroup hasValidation>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" className='email' onChange={(e) => setUser(e.target.value)} required />
                                <Form.Control.Feedback type="invalid" className='invalid-message'>
                                    Please enter email address!
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                        <InputGroup hasValidation>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" className='password' onChange={(e) => setPassword(e.target.value)} required />
                                <Form.Control.Feedback type="invalid" className='invalid-message'>
                                    Password required!
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>
                        <Button variant="primary" type="submit" className='mt-3'>
                            {btnLabel}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container >
    )
}


export default Login