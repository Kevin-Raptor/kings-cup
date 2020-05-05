import React,{useState} from 'react';
import './App.css';
import {Button,Card,Grid} from '@material-ui/core';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}))

const App = () => {
  
  const [deckId,setDeckId] = useState("cqif69lwm9tz")
  const [card,setCard] = useState({

image: "https://deckofcardsapi.com/static/img/JS.png",
});
  const handleGetCard = () => {
    Axios.get("https://deckofcardsapi.com/api/deck/"+deckId+"/draw/?count=10")
    .then(resp => {
      setCard(resp.data.cards[0])
      console.log(resp.data.cards[0])
    })
  }
  const handleShuffle = () => {
    Axios.get("https://deckofcardsapi.com/api/deck/"+deckId+"/shuffle/")
    .then(resp => {
      console.log(resp)
    })
  }

  return (
    <div className="App" style={{backgroundColor:'#00FF00',height:"100%",width:'100%'}}>
      
      <Card >
        <Grid container >
          <img src={card.image} alt="Card" style={{margin:'auto'}}></img>
        </Grid>
        <Button variant="contained" onClick={handleShuffle}>Shuffle Deck</Button>
        <Button variant="contained" onClick={handleGetCard}>Next Card</Button>
        
      </Card>
    </div>
  );
}

export default App;
