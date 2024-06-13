import PCNavBar from 'components/PCNavBar'
import PokeCard from 'components/PokeCard';
import React, { useEffect,useState } from 'react'

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
  return (
    <>
      <PCNavBar/>
      {
        cards.map((card,index) => (
          <PokeCard key={index} card={card}/>
        ))
      }
    </>
  )
}

export default Cardspage
