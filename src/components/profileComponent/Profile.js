import { useNavigate } from "react-router-dom"
import { useAuth } from "../../utils/auth"
import { Button } from "reactstrap"

const Profile = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/')
    }

    return (
        <>
            <div>Welcome {auth.user}</div>
            <Button color="danger" onClick={handleLogout}>
                Logout
            </Button>
        </>
    )
}

export default Profile