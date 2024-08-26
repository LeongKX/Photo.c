import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const GuestLinks = () => {
    return (
        <>
            <Nav.Link to="/register" as={Link} className="text-warning">
				Register
			</Nav.Link>
			<Nav.Link to="/login" as={Link} className="text-warning">
				Login
			</Nav.Link>
        </>

    );
}

export default GuestLinks;