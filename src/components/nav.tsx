import { useEffect, useState } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import Http from '../utils/http'


export default function NavbarTop() {

    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        callApi();
    }, [])
    const callApi = async () => {
        await Http.get(`/api/user`).then(response => {
            if (response) setUserData(response.data.data)
        }).catch(e => {

        });

    }

    const handleLogout = async (e) => {
        await Http.post(`/api/logout`).then(response => {

        }).catch(e => {

        });
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Seo Tool</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard/tracking">Rank Tracking</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>Welcome : {userData?.name} [<span className='pointer' onClick={handleLogout}>Logout</span>]</Navbar.Text>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
