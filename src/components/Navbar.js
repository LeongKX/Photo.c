import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import GuestLinks from "./GuestLinks";
import AdminLinks from "./AdminLinks";
import UserLinks from "./UserLinks";
// import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { clearToken, isAdmin } from "../utils/authToken";

const TopNav = ({ data: { token, setToken } }) => {
  // const authToken = Cookies.get("authToken");
  // const navigate = useNavigate();
  const logoutHandler = () => {
    clearToken();
    setToken(null);
    // navigate("/login");
    return redirect("/login");
  };

  return (
    <Navbar bg="warning-subtle" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand className="text-warning">PhoToes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-nav" />
        <Navbar.Collapse id="basic-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-warning">
              Home
            </Nav.Link>
            {!token && <GuestLinks />}
            {token && !isAdmin() ? <UserLinks /> : null}
            {token && isAdmin() ? <AdminLinks /> : null}
            {token ? (
              <Nav.Link as={Link} onClick={() => logoutHandler()} className="text-warning">
                Logout
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNav;
