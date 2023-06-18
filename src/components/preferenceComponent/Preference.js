
import { Row } from "reactstrap"
import './Preference.css'


const Preference = (props) => {
    return (
        <Row className="flex-column custom-check-group">
            {props.genresEl}
        </Row>
    )
}

export default Preference