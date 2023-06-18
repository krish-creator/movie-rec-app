import { useNavigate } from "react-router-dom"
import { useAuth } from "../../utils/auth"
import { Container, Button, Row, Col } from "reactstrap"
import Preference from "../preferenceComponent/Preference"
import apiUrls from '../../api/utils/apiUrls.json'
import apiReference from "../../api/services/apiReference"
import { useEffect, useState } from "react"
import './Profile.css'

const Profile = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [genres, setGenres] = useState([])
    const [userDetails, setUserDetails] = useState({
        name: "",
        preference: ""
    })
    const [preference, setPreference] = useState("")

    const handleLogout = () => {
        auth.logout()
        navigate('/')
    }

    useEffect(() => {
        apiReference(apiUrls.movieGenres).then((data) => {
            setGenres(data.genres.map(data => {
                return {
                    ...data,
                    isSet: false
                }
            }))
        })
    }, [])

    const handleChange = (e, genreName) => {
        const { name, checked } = e.target
        setGenres(prevGenres => {
            return (
                prevGenres.map(genre => {
                    return {
                        ...genre,
                        [name]: (genre.name === genreName ? checked : genre.isSet)
                    }
                })
            )
        })
    }

    // useEffect(() => {
    //     setPreference
    // }, [])

    useEffect(() => {
        setUserDetails(prevUserDetails => {
            return (
                auth.user &&
                {
                    ...prevUserDetails,
                    name: auth.user,
                    preference: genres.name
                }
            )
        })
    }, [auth, genres])

    const genresEl = genres
        && genres.map((genre) => {
            return (
                <Col className="form-check-reverse form-switch col-3 mx-auto custom-check" key={genre.id}>
                    <label
                        className="form-check-label"
                        htmlFor="genre">
                        {genre.name}
                    </label>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="genre"
                        name="isSet"
                        checked={genre.isSet}
                        onChange={(e, genreName) => handleChange(e, genre.name)}
                    />
                </Col>
            )
        })

    useEffect(() => {
        console.log(genres);
    }, [userDetails])

    return (
        <Container fluid className="container d-flex flex-column justify-content-center my-5">
            <Row>
                <Col className="title mb-3 col-3 mx-auto">User Profile</Col>
            </Row>
            <Row>
                <Col className="greeting mb-5 col-3 mx-auto">Welcome {auth.user}!</Col>
            </Row>
            <Row>
                <Col className="sub-title mb-3 col-3 mx-auto">Preferences</Col>
            </Row>
            <Preference genresEl={genresEl} />
            <Row>
                <Col className="col-3 mx-auto d-flex justify-content-center mt-5">
                    <Button color="danger" onClick={handleLogout} className="=btn-logout">
                        Logout
                    </Button>
                </Col>
            </Row>


        </Container >
    )
}

export default Profile