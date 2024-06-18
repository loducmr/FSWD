import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png"

const Layout = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
          <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}

            React SPA</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="profile">Profile</Nav.Link>
            <Nav.Link href="contact">Contact Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
      </>
  );
}

export default Layout;