import React,{forwardRef} from 'react'; //usng forwardref for animation
import { Typography, CardContent, Card } from '@material-ui/core';
import './Message.css'

const Message = forwardRef(({message , username}, ref) => {  //object destructuring
    const isUser = username === message.username; // to check if user is the one who is logged in 

    return(
        <div ref= {ref} className={`message ${isUser && 'message__user'}`}> 
        <div className ="message__username">
        {!isUser && `${message.username || 'Unknown User'} `}</div> 
            <Card className = {isUser ? "message__userCard":"message__guestcard"}>
                <CardContent>
                    <Typography
                        color = "white"
                        variant = "h5"
                        component = "h2"
                        >
                            {message.message} 
                    </Typography>
                 </CardContent>
            </Card>
            
        </div>
    );
})

export default Message;