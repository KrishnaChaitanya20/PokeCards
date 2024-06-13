import PCNavBar from 'components/PCNavBar'
import PokeCard from 'components/PokeCard';
import React, { useEffect,useState } from 'react'
import { Container, Row,Col } from 'react-bootstrap';

const Cardspage = () => {
  const [cards,setCards] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/cards')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCards(data);
    });
  }, []);

  const grid={
      xs:6,
      sm:4,
      md:4,
      lg:3,

  }

  return (
    <>
      <PCNavBar/>
      <Container>
        <Row>
          {
            cards.map((card,index) => (
              <Col {...grid}>
                <PokeCard key={index} card={card}/>
              </Col>
            ))
          }
        </Row>
      </Container>

      
    </>
  )
}

export default Cardspage
