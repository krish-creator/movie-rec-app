import { useNavigate } from "react-router-dom"
import { useAuth } from "../../utils/auth"
import { Container, Button, Row, Col } from "reactstrap"
import './Profile.css'

const Profile = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/')
    }

    return (
        <Container fluid className="container">
            <Row>
                <Row>
                    <Col className="title mb-3 col-3 mx-auto">User Profile</Col>
                </Row>
                <Row>
                    <Col className="greeting mb-5 col-3 mx-auto">Welcome {auth.user}!</Col>
                </Row>
                <Row>
                    <Col className="sub-title mb-3 col-3 mx-auto">Preferences</Col>
                </Row>
                <Row className="flex-column custom-check-group">
                    <Col className="form-check-reverse form-switch col-3 mx-auto custom-check">
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Adult</label>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    </Col>
                    <Col className="form-check-reverse form-switch col-3 mx-auto custom-check">
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Action</label>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    </Col>
                    <Col className="form-check-reverse form-switch col-3 mx-auto custom-check">
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Comedy</label>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    </Col>
                </Row>

                <Row>
                    <Col className="col-3 mx-auto d-flex justify-content-center mt-5">
                        <Button color="danger" onClick={handleLogout} className="=btn-logout">
                            Logout
                        </Button>
                    </Col>
                </Row>


            </Row>
        </Container >
    )
}

export default Profile