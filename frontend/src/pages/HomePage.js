import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PageCard from '../components/PageCard'
import '../styles/HomePage.css'

const HomePage = () => {
  const cardspageprop={
    png: 'assets/pokeball.png',
    text: 'View Cards'
  }
  const matchpageprop={
    png: 'assets/charmeleon.png',
    text: 'Battle'
  }
  const unknownpageprops={
    png: 'assets/pikachu.png',
    text: 'Unknown'
  }

  const Colsprops={
    xs:8,
    lg: 4,
    className: 'pagecard mt-2 mb-3'
  }

  return (
    <>
        <Container className='my-auto'>
          <Row style={{ justifyContent: 'space-around' }}>
              <Col {...Colsprops}>
                <PageCard props={cardspageprop} />
              </Col>
              <Col {...Colsprops}>
                <PageCard props={matchpageprop} />
              </Col>
              <Col {...Colsprops}>
                <PageCard props={unknownpageprops} />
              </Col>
          </Row>
      </Container>
    </>
  )
}

export default HomePage
