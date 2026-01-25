import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaSignal, FaUser } from "react-icons/fa6";
import Http from "../utils/http";

export default function NavbarTop() {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    callApi();
  }, []);
  const callApi = async () => {
    await Http.get(`/api/user`)
      .then((response) => {
        if (response) setUserData(response.data.data);
      })
      .catch((e) => {});
  };

  const handleLogout = async (e) => {
    await Http.post(`/api/logout`)
      .then((response) => {})
      .catch((e) => {});
  };

  return (
    <Navbar className="navbarTop" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home" className="navBrand">
          <span className="brandIcon">📊</span>
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navItems">
            <NavDropdown
              title="Binance"
              id="binance-nav-dropdown"
              className="navDropdown"
            >
              <NavDropdown.Item
                href="/dashboard/binance/history"
                className="dropdownItem"
              >
                History
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/dashboard/binance/future_xgb_logs"
                className="dropdownItem"
              >
                Future XGB Logs
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/dashboard/binance/config"
                className="dropdownItem"
              >
                Config
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Posts"
              id="posts-nav-dropdown"
              className="navDropdown"
            >
              <NavDropdown.Item
                href="/dashboard/posts"
                className="dropdownItem"
              >
                Lists
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="navbarUser">
            <div className="userInfo">
              <FaUser className="userIcon" />
              <span className="userName">{userData?.name}</span>
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              className="logoutBtn"
              onClick={handleLogout}
              title="Logout"
            >
              <FaSignal /> Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
