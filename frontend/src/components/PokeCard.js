import React from 'react'
import { Container, Row,Col } from 'react-bootstrap';
import { Card, Button,CardImgOverlay } from 'react-bootstrap';
import theme from '../themes';

const PokeCard = ({ card }) => {
console.log(card);
return (
	<div>
		<Card className='p-1 bg-danger' >
			<Card className='p-2'>
				<Card.Img variant="top" style={{width:'90%'}} src={card.image} />
				<Card.Body className='mt-2 mb-2'>
					<Card.Title>{card.name}</Card.Title>
					<Card.Subtitle style={{ color: theme[card.type] }}>{card.type}</Card.Subtitle>
					<Card.Text>
						{card.description}
					</Card.Text>
				</Card.Body>
			</Card>
		</Card>
	</div>
)
}

export default PokeCard
