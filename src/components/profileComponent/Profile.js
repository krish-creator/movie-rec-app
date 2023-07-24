import { useNavigate } from "react-router-dom"
import { Container, Button, Row, Col } from "reactstrap"
import Preference from "../preferenceComponent/Preference"
import './Profile.css'

import { userDetailsInDB } from '../../utils/auth'
import { onValue, update } from "firebase/database";
import { useState, useEffect } from "react"

const Profile = (props) => {

    const { handleChange, currentUser, setUser, genres, user } = props

    const navigate = useNavigate()
    const [genresEl, setGenresEl] = useState([])

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [user])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const logout = () => {
        onValue(userDetailsInDB, function (snapshot) {
            let userDetailsArray = Object.values(snapshot.val())
            for (let i = 0; i < userDetailsArray.length; i++) {
                if (userDetailsArray[i].name === currentUser) {
                    update(userDetailsInDB, JSON.parse(localStorage.getItem("userDetails")))
                }
            }
            setUser(null)
            localStorage.removeItem("userName")
            localStorage.removeItem("genres")
        })
    }


    useEffect(() => {
        setGenresEl(genres
            && genres.map((genre) => {
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
                            onChange={(e, genreName) => handleChange(e, genre.name)}
                        />
                    </Col>
                )
            })
        )
        // eslint-disable-next-line 
    }, [genres])


    return (
        <Container fluid className="container d-flex flex-column justify-content-center my-5">
            <Row>
                <Col className="title mb-3 col-4 mx-auto">User Profile</Col>
            </Row>
            <Row>
                <Col className="greeting mb-3 col-4 mx-auto text-center">Welcome {user}! 🥳</Col>
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