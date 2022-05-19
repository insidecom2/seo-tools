
import { useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Http from '../utils/http';
import { HTTP_STATUS_CODE } from '../utils/constants'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

export interface dataFormData {
    email: string
    password: string
    rememberPassword: number
}
export default function Login() {
    const [formData, setFormData] = useState<dataFormData>();
    const [alert, setAlert] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading == false) {
            setAlert('')
            setLoading(true);
            try {
                const response: any = await Http.post('/api/login', formData)
                if (response.status === HTTP_STATUS_CODE.OK) {
                    if (response.data.status) {
                        Cookies.set('token', response.data.token)
                        router.push('/tracking')
                    } else {
                        setAlert(response.data.message)
                    }
                }

            } catch (error) {

            }
            setLoading(false);
        }
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
                                    <Form.Control name='password' type="password" onChange={handleChange} placeholder="Enter password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" name='rememberPassword' onChange={handleChange} label="Remember password" />
                                </Form.Group>
                                <Button variant="danger" className='w-100' type="submit">
                                    Login
                                </Button>
                            </Form>

                            {loading && (<div className='py-3 text-center'><FontAwesomeIcon icon={faSpinner} spin /> <span>Loading</span> </div>)}

                            {alert != '' && (<div className='py-3 text-center'>
                                <span>{alert}</span>
                            </div>)}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}