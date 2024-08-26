import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminLinks = () => {
	return (
		<>
			<Nav.Link to="/dashboard" as={Link} className="text-warning">Dashboard</Nav.Link>
			<Nav.Link to="/allorder" as={Link} className="text-warning">All Orders</Nav.Link>
		</>
	);
};

export default AdminLinks;
