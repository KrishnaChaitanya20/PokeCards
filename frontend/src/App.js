import './App.css';
import { Container, Row,Col } from 'react-bootstrap';
import PokeCard from './components/PokeCard';

function App() {
  const pikachu = { 
    name: 'Pikachu',
    type: 'electric',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    description: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
    moves: [
      {name: 'Thunder Shock', dmg: 40},
      {name: 'Quick Attack', dmg: 40},
      {name: 'Electro Ball', dmg: 80},
      {name: 'Thunderbolt', dmg: 90}
    ]
  }

  return (

    <Container>
        <Row>
            <Col md={4} className='bg-red'>
            <PokeCard card={pikachu} />
            </Col>
        </Row>
    </Container>
  );
}

export default App;
