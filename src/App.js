import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, FormControl, InputLabel,Input , IconButton} from '@material-ui/core';
import Message from './Message';
import db from './firebase'; //firebase.js
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send'; 
import { ThemeProvider } from '@livechat/ui-kit';
import chatbackground from './chatbackground.jpg';
function App(){
  //useState: used to set a variable in react
  const[input, setInput] = useState(''); //individual message
  const[messages,setMessages] = useState([]); //list of messages to display like a chat
  const [username, setUsername] = useState(''); //for usernames
  
  
  //useEffect: conditional rendering in react
  //so based on certain conditions the useEffect will run.

  useEffect(()=>{
    //run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc=> ({id:doc.id, message :doc.data()})))  //get the id from the firestore db to set it as key in map function
    })
  },[])

  useEffect(()=>{
    //run code here.
    //if its balnk inside [], this code runs once when the app component loads. i.e.,
    //no conditon: runs only when the page loads
    //if [] has value, every time value changes the code here runs
    setUsername(prompt('Please enter your name'));
  },[]); //condition. Map the condition to variable

  console.log(input);
  console.log(messages);


  const sendMessage = (event) => {
    //logic to send the message goes here
    event.preventDefault(); //prevents form from refreshing the page upon hitting submit
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
   // setMessages([...messages, {username: username , message: input}]); //append input (individual message) to message list
    setInput(''); //so that the message text box clears after being sent
  }
  return(
      <div className="App">
        <h1>Hello {username}</h1>
        {/* <img className='app__bgimage' src ={chatbackground}/> */}
        <ThemeProvider>
        {/* Using form 'cause it allows us to use "type = submit" in "button" which 
        in turn allows us to use enter key to send a message */}
        <form className="app__form">
        <FormControl className="app__formControl">
          {/* <InputLabel>Enter a message...</InputLabel> */}
          <Input className="app__input" placeholder="Enter a message..." value = {input} onChange = {event => setInput(event.target.value)}/>
         
         <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick = {sendMessage}>
           <SendIcon/>
           </IconButton>
        {/* disbled: without input the button is disabled */}
        </FormControl>
        </form>
        </ThemeProvider>
        
        {/* looping through each message element */}
        <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username = {username} message = {message}/> //sending message object and username. Keys are used so react knws
                                                              
          ))
        }
        </FlipMove>
      </div>
  );
}

export default App;