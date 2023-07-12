import { useNavigate } from "react-router-dom"
import { Container, Button, Row, Col } from "reactstrap"
import Preference from "../preferenceComponent/Preference"
import './Profile.css'

const Profile = (props) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        props.auth.logout()
        navigate('/')
    }

    const genresEl = props.genres
        && props.genres.map((genre) => {
            return (
                <Col className="form-check-reverse form-switch col-md-3 mx-auto custom-check" key={genre.id}>
                    <label
                        className="form-check-label"
                        htmlFor={genre.id}>
                        {genre.name}
                    </label>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={genre.id}
                        name="isSet"
                        checked={genre.isSet}
                        onChange={(e, genreName) => props.handleChange(e, genre.name)}
                    />
                </Col>
            )
        })


    return (
        <Container fluid className="container d-flex flex-column justify-content-center my-5">
            <Row>
                <Col className="title mb-3 col-4 mx-auto">User Profile</Col>
            </Row>
            <Row>
                <Col className="greeting mb-3 col-4 mx-auto text-center">Welcome {props.auth.user}! 🥳</Col>
            </Row>
            <Row>
                <Col className="sub-title col-4 mx-auto">Preferences</Col>
            </Row>
            <Row>
                <Col className=" mb-3 col-4 text-center mx-auto">
                    <small className="d-none d-sm-none d-md-block">Set your preference for recommended movies on homepage</small>
                </Col>
            </Row>
            <Preference genresEl={genresEl} />
            <Row>
                <Col className="col-4 mx-auto d-flex justify-content-center mt-5">
                    <Button color="danger" onClick={handleLogout} className="=btn-logout">
                        Logout
                    </Button>
                </Col>
            </Row>
        </Container >
    )
}

export default Profile