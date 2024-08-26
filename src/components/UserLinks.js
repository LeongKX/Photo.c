import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserLinks = () => {
	return (
		<>
			<Nav.Link as={Link} to="/order" className="text-warning">Orders</Nav.Link>
			<Nav.Link to="/dashboard" as={Link} className="text-warning">Dashboard</Nav.Link>
		</>
	);
};

export default UserLinks;
