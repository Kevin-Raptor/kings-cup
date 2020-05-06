import React,{useState} from 'react';
import './App.css';
import {Button,Card,Grid,AppBar,Toolbar,Typography} from '@material-ui/core';
import Axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Finger from './finger.png'
import Joker from './Joker.jpg'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const useStyles = makeStyles((theme) => ({
    cardsRemainingText: {
      textAlign:'center',
      [theme.breakpoints.down("sm")]: {
        fontSize: 30
      }
  },
  title: {
    flexGrow: 4,
    textAlign:'left'
  },
  cardSize:{
    margin:'auto',
    width:'300px',
    [theme.breakpoints.down('sm')]: {
      width:'150px'
    }
  },
  card:{
    paddingTop:20,
    marginLeft:'3%',
    marginRight:'3%',
    paddingLeft:'5%',
    paddingRight:'5%',
    paddingBottom:40,
    marginTop:25,
    [theme.breakpoints.down('sm')]: {
      marginLeft:'4%',
      marginRight:'4%',
    }
  },
  rulesCard:{
    paddingLeft:23,
    paddingRight:23,
    paddingTop:2,
    marginLeft:'3%',
    marginRight:'3%',
   
    marginTop:10,
    marginBottom:10,
    [theme.breakpoints.down('sm')]: {
      marginLeft:'4%',
      marginRight:'4%',
    }
  },
  button:{
    height:80,
    fontSize:'15pt',
    [theme.breakpoints.down('sm')]:{
      height:50,
      fontSize:'12pt'
    }
  },
  geneFinger:{
    marginTop:20,
    [theme.breakpoints.down('sm')]:{
      width:'120px'
    }
  },
  listItemText:{
    fontSize:20,
    fontWeight:600
  },
  table: {
    minWidth: 500,
  },
}))

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
    fontWeight:600
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#afafaf',
    },
  },
}))(TableRow);

const App = () => {

  const classes = useStyles();
  
  const [geneDialogFlag,setGeneDialogFlag] = useState(false)
  const [deckId,setDeckId] = useState("cqif69lwm9tz")
  const [card,setCard] = useState({});
  const [cardsRemaining,setCardsRemaining] = useState(0)

  const rules = [
    { card:"King" , title:"pending", rule:"pending" }, 
    { card:"Queen" , title:"Question Master", rule:"Ask questions, those who answer drink." }, 
    { card:"Jack" , title:"Never Have I Ever", rule:"Loser of this one drinks." }, 
    { card:"Ten" , title:"Categories", rule:"Pick a category, others must continue." }, 
    { card:"Nine" , title:"Bust a Rhyme", rule:"Pick a word, others must rhyme." }, 
    { card:"Eight" , title:"Mate", rule:"Find a drinking buddy." }, 
    { card:"Seven" , title:"Heaven", rule:"Reach for the sky." }, 
    { card:"Six" , title:"New Rule", rule:"Create a rule." }, 
    { card:"Five" , title:"All", rule:"Everyone drinks." }, 
    { card:"Four" , title:"Floor", rule:"Last person to touch the floor drinks." }, 
    { card:"Three" , title:"Me", rule:"Take 2 drinks." }, 
    { card:"Two" , title:"You", rule:"Pick someone to take 2 drinks." }, 
    { card:"Ace" , title:"Waterfall", rule:"Everyone drinks, starting with you." },
  ]

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
      setCard({})
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
    <div className="App" style={{backgroundColor:'#D64045',height:"100%",width:'100%'}}>
      <Dialog
        open={geneDialogFlag}
        onClose={handleCloseGeneDialog}>
        <DialogContent>
          <Typography variant="h3" className={classes.cardsRemainingText}>Just For You Gene</Typography>
          <img src={Finger} className={classes.geneFinger}  placeholder={Joker}></img>
          <img src={Finger} className={classes.geneFinger} placeholder={Joker}></img>

        </DialogContent>

      </Dialog>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Dawg's Cup
        </Typography>
        <Button color="inherit" onClick={handleGeneDialog}>Click Me</Button>
      </Toolbar>
      </AppBar>

      <Grid container   
        direction="row"
        justify="space-around"
        alignItems="center">

        <Card raised={true} className={classes.card}>
          <Typography variant="h3" className={classes.cardsRemainingText}>Cards Remaining : {cardsRemaining}</Typography>
          <Grid container style={{marginTop:20,marginBottom:20}}>
            <img src={card.image ? card.image : Joker} alt="Card" className={classes.cardSize} id="imageId"></img>
          </Grid>
          <Grid container style={{paddingLeft:20,paddingRight:20}}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Button color="primary" variant="contained" size="large" className={classes.button}  onClick={handleShuffle} fullWidth>Shuffle Deck</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Button color="primary" variant="outlined" size="large" className={classes.button}  onClick={handleGetCard} disabled={cardsRemaining===0} fullWidth>Next Card</Button>
            </Grid>
          </Grid>      
        </Card>

        <Card className={classes.rulesCard} raised={true} >
          <Typography variant="h3" className={classes.cardsRemainingText}>Game Rules</Typography>

          <TableContainer >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">Card</StyledTableCell>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Rule</StyledTableCell>
      
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rules.map((row) => (
                <StyledTableRow key={row.card}>
                  <StyledTableCell component="th" scope="row">
                    {row.card}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row.rule}</StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

 
          </Card>

      

      </Grid>      

    </div>
  );
}

export default App;
