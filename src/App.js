import React,{useState} from 'react';
import './App.css';
import {Button,Card,Grid,AppBar,Toolbar,Typography} from '@material-ui/core';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Finger from './finger.png'
import Joker from './Joker.jpg'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 4,
    textAlign:'left'
  },
  cardSize:{
    margin:'auto',
    width:'400px',
    [theme.breakpoints.down('sm')]: {
      width:'200px'
    }
  }
}))

const App = () => {

  const classes = useStyles();
  
  const [geneDialogFlag,setGeneDialogFlag] = useState(false)
  const [deckId,setDeckId] = useState("cqif69lwm9tz")
  const [card,setCard] = useState({});
  const [cardsRemaining,setCardsRemaining] = useState(0)

  const handleGetCard = () => {
    Axios.get("https://deckofcardsapi.com/api/deck/"+deckId+"/draw/?count=1")
    .then(resp => {
      if(!resp.success){
        
        setCard(resp.data.cards[0])
        console.log(resp)
        setCardsRemaining(resp.data.remaining)
      }
    })
    .catch((error)=>console.log(error))
  }
  const handleShuffle = () => {
    Axios.get("https://deckofcardsapi.com/api/deck/"+deckId+"/shuffle/")
    .then(resp => {
      console.log(resp);
      setCardsRemaining(52)
    })
    .catch((error)=>console.log(error))

  }

  const handleGeneDialog = () => {
    setGeneDialogFlag(true);
    setTimeout(() => {
      setGeneDialogFlag(false)
    },3000)
  }

  const handleCloseGeneDialog = () => {
    // setGeneDialogFlag(false)
  }

  return (
    <div className="App" style={{backgroundColor:'#D64045',height:"100vh",width:'100%'}}>


      <Dialog
        open={geneDialogFlag}
        onClose={handleCloseGeneDialog}>
        <DialogContent>
          <Typography variant="h4">Just For You Gene</Typography>
          <img src={Finger} style={{marginTop:20}} placeholder={Joker}></img>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGeneDialog} color="primary">
            Agree
          </Button>

        </DialogActions>
      </Dialog>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Dawg's Cup
        </Typography>
        <Button color="inherit" onClick={handleGeneDialog}>Click Me</Button>
      </Toolbar>
    </AppBar>
      <Card raised={true} style={{paddingTop:20,marginLeft:'30%',marginRight:'30%',paddingBottom:40,marginTop:25}}>
        <Typography variant="h3">Cards Remaining : {cardsRemaining}</Typography>
        <Grid container style={{marginTop:20,marginBottom:20}}>
          <img src={card.image ? card.image : Joker} alt="Card" className={classes.cardSize} id="imageId"></img>
        </Grid>
      <Grid container style={{paddingLeft:20,paddingRight:20}}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Button color="primary" variant="contained" size="large" style={{height:80,fontSize:'20pt'}} onClick={handleShuffle} fullWidth>Shuffle Deck</Button>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Button color="primary" variant="outlined" size="large" style={{height:80,fontSize:'20pt'}} onClick={handleGetCard} disabled={cardsRemaining===0} fullWidth>Next Card</Button>
        </Grid>
      </Grid>
        
      </Card>
    </div>
  );
}

export default App;
