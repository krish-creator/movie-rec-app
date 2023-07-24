
import { Row } from "reactstrap"
import './Preference.css'


const Preference = (props) => {

    const { genresEl } = props

    return (
        <Row className="flex-column custom-check-group">
            {genresEl}
        </Row>
    )
}

export default Preference