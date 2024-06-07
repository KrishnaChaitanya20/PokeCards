import React from 'react'
import { Container, Row,Col } from 'react-bootstrap';
import { Card, Button,CardImgOverlay } from 'react-bootstrap';
import theme from '../themes';

const PokeCard = ({ card }) => {
const mystyle = {
	width: '100%',
	margin: '5px',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'clip',
};

console.log(card);
return (
	<div>
		<Card className='p-2' style={{background:'#FF0000'}}>
			<Card>
				<Card.Img variant="top" src={card.image} />
				<CardImgOverlay>
					<Card.Title  className='mt-auto'>{card.name}</Card.Title>
					<Card.Subtitle style={{color:theme[card.type]}} >{card.type}</Card.Subtitle>
				</CardImgOverlay>
				<Card.Body>
					<Card.Text>
						{card.description}
					</Card.Text>
			
					<Container>
						<Row>
							<Col>
								<Button variant="danger" style={mystyle}>{`${card.moves[0].name} : ${card.moves[0].dmg}`}</Button>
							</Col>
							<Col>
								<Button variant="success" style={mystyle}>{`${card.moves[1].name} : ${card.moves[1].dmg}`}</Button>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button variant="warning" style={mystyle}>{`${card.moves[2].name} : ${card.moves[2].dmg}`}</Button>
							</Col>
							<Col>
								<Button variant="primary" style={mystyle}>{`${card.moves[3].name} : ${card.moves[3].dmg}`}</Button>
							</Col>
						</Row>
						
					</Container>
				</Card.Body>
			</Card>
		</Card>
	</div>
)
}

export default PokeCard
