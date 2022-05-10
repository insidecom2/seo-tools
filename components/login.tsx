
import { useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSpinner } from '@fortawesome/free-solid-svg-icons'

export interface dataFormData {
    email: string
    password: string
    rememberPassword: number
}
export default function Login() {
    const [formData, setFormData] = useState<dataFormData>();
    const [alert, setAlert] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
    }
    const handleChange = (ele) => {
        const { name, value } = ele.target;
        if (name == 'rememberPassword') {
            setFormData(formData => ({
                ...formData,
                [name]: ele.target.checked ? 1 : 0
            }));
        } else {
            setFormData(formData => ({
                ...formData,
                [name]: value
            }));
        }
    }
    return (
        <Container className=' py-5 h-100'>
            <Row className='row d-flex justify-content-center align-items-center h-100'>
                <Col md={6}>
                    <Card className='card shadow-2-strong rounded' >
                        <Card.Body className='p-5'>
                            <h3 className=' text-center'>Sign In</h3>
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Group className="form-outline mb-4" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control name='email' type="email" placeholder="Enter email" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="form-outline mb-4" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name='password' type="password" placeholder="Enter password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" name='rememberPassword' onChange={handleChange} label="Remember password" />
                                </Form.Group>
                                <Button variant="danger" className='w-100' type="submit">
                                    Login
                                </Button>
                            </Form>
                            {loading ?
                                <div className='py-3 text-center'>
                                    <FontAwesomeIcon icon={faSpinner} spin /> <span>Loading</span>
                                </div>
                                : ''}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}