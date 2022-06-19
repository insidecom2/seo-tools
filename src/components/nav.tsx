import { useEffect, useState } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import Http from '../utils/http'


export default function NavbarTop() {

    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        callApi();
    }, [])
    const callApi = async () => {
        const res: any = await Http.get(`/api/user`)
        setUserData(res.data.data)
    }

    const handleLogout = async (e) => {
        await Http.post(`/api/logout`)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Seo Tool</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard/tracking">Rank Tracking</Nav.Link>
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>Welcome : {userData?.name} [<span className='pointer' onClick={handleLogout}>Logout</span>]</Navbar.Text>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
