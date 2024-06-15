import React from 'react'
import { Card, Container,Row,Col } from 'react-bootstrap'

const PageCard = ({props}) => {
    return (
        <Card >
            <Container>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6} >
                        <Card.Img variant="top" src={props.png} />
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </Container>
            <Card.Body className="text-center mt-2">
                <Card.Title>{props.text}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default PageCard
