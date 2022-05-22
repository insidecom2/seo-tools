import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import NavbarTop from '../src/components/nav'
import { HTTP_STATUS_CODE } from '../src/utils/constants';
import Http from '../src/utils/http';

export interface dataFormData {
    keyword: string,
    url: string
}

export default function Tracking() {

    const [formData, setFormData] = useState<dataFormData>({ keyword: '', url: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoading) {
            setIsLoading(true)  
            try {
                const response: any = await Http.post('/api/tools/check_rang', formData)
                if (response.status === HTTP_STATUS_CODE.OK) {
                    if (response.data.status) {
                       
                    } else {
                        
                    }
                }
                setIsLoading(false)

            } catch (error) {

            }
        }
    }

    const handleChange = (ele) => {
        const { name, value } = ele.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }
    return (
        <div>
            <NavbarTop></NavbarTop>
            <Container className=' py-5 h-100'>
                <Row className='row d-flex justify-content-center align-items-center h-100'>
                    <Col md={6}>
                        <h2>Tracking Keyword</h2>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="form-outline mb-4" controlId="formBasicEmail">
                                <Form.Label>Keyword</Form.Label>
                                <Form.Control name='keyword' type="text"  placeholder="Enter keyword" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="form-outline mb-4" controlId="formBasicPassword">
                                <Form.Label>Url</Form.Label>
                                <Form.Control name='url' type="text" onChange={handleChange} placeholder="Enter url" />
                            </Form.Group>
                            
                            <Button variant="info" className='w-50' type="submit">
                                Search
                            </Button>
                            <div className='py-4'>
                                Result :
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

